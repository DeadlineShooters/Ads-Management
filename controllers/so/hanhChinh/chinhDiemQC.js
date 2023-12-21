import AdLocationChangeReq from "../../../models/adLocationChangeRequest.js"
import AdBoard from "../../../models/adBoard.js";

export const dsChinhDiemQC = async (req, res) => {
    let perPage = 12; //moi trang co 12 tai khoan can bo
    let page = req.query.page || 1;
    const breadcrumbs = [];
    try {
        const ChinhDiemQC = await AdLocationChangeReq.find({}).populate({
            path: 'adLocation',
            populate: [
                { path: 'ward', model: 'Ward'  },
                { path: 'district', model: 'District'},
                { path: 'type', model: 'LocationType'},
                { path: 'adType', model: 'AdType'},
            ]
        }).populate('sender')
        console.log(ChinhDiemQC);
        const count = await AdLocationChangeReq.countDocuments({});
        res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs',  { 
            ChinhDiemQC,
            current: page,
            pages: Math.ceil(count / perPage),
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

export const chiTietChinhDiemQC = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [];
    try {
        const chiTietChinhDiemQC = await AdLocationChangeReq.findById(id).populate({
            path: 'adLocation',
            populate: [
                { path: 'ward', model: 'Ward'  },
                { path: 'district', model: 'District'},
                { path: 'type', model: 'LocationType'},
                { path: 'adType', model: 'AdType'},
            ]
        }).populate('sender')
        console.log(chiTietChinhDiemQC);
        res.render('so/hanhChinh/chiTiet/ndChinhDiemQC.ejs',  { 
            chiTietChinhDiemQC,
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

export const capNhatChinhDiemQC = async (req, res) => {
    const id = req.body.adLocationChangeRequestId;
    try {
        await AdLocationChangeReq.findByIdAndUpdate(id, {
            status: req.body.newStatus
        })
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}