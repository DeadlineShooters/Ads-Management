import AdBoardChangeReq from "../../../models/adBoardChangeRequest.js"
import AdBoard from "../../../models/adBoard.js";

export const dsChinhBangQC = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await AdBoardChangeReq.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      page,
      totalPages,
      itemsPerPage,
    };
    const breadcrumbs = [];
    try {
        const ChinhBangQC = await AdBoardChangeReq.find({}).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender').skip((page - 1) * itemsPerPage).limit(itemsPerPage);
        res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs',  { 
            ChinhBangQC,
            pagination,
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

export const chiTietChinhBangQC = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [];
    try {
        const chiTietChinhBangQC = await AdBoardChangeReq.findById(id).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender')
        console.log(chiTietChinhBangQC);
        res.render('so/hanhChinh/chiTiet/ndChinhBangQC.ejs',  { 
            chiTietChinhBangQC,
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

export const capNhatChinhBangQC = async (req, res) => {
    const id = req.body.adBoardChangeRequestId;
    try {
        await AdBoardChangeReq.findByIdAndUpdate(id, {
            status: req.body.newStatus
        })
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}