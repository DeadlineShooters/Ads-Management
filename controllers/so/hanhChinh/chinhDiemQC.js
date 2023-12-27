import AdLocationChangeReq from "../../../models/adLocationChangeRequest.js"
import AdBoard from "../../../models/adBoard.js";

export const dsChinhDiemQC = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await AdLocationChangeReq.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      page,
      totalPages,
      itemsPerPage,
    };
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
        res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs',  { 
            ChinhDiemQC,
            pagination,
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