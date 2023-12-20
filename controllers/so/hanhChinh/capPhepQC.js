import AdBoardReq from "../../../models/adBoardRequest.js"

export const dsCapPhepQC = async (req, res) => {
    let perPage = 12; //moi trang co 12 tai khoan can bo
    let page = req.query.page || 1;
    const breadcrumbs = [];
    try {
        const CapPhepQC = await AdBoardReq.find({}).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender')
        const count = await AdBoardReq.countDocuments({});
        res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs',  { 
            CapPhepQC,
            current: page,
            pages: Math.ceil(count / perPage),
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

export const chiTietYeuCauCapPhep = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [];
    try {
        const chiTietCapPhepQC = await AdBoardReq.findById(id).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender')
        console.log(chiTietCapPhepQC);
        res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs',  { 
            chiTietCapPhepQC,
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

export const capNhatYeuCauCapPhep = async (req, res) => {
    const id = req.body.adBoardRequestId;
    try {
        await AdBoardReq.findByIdAndUpdate(id, {
            status: req.body.newStatus
        })
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}