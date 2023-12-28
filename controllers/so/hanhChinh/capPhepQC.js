import AdBoardRequest from "../../../models/adBoardRequest.js"

export const dsCapPhepQC = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await AdBoardRequest.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      page,
      totalPages,
      itemsPerPage,
    };
    const breadcrumbs = [];
    try {
        const CapPhepQC = await AdBoardRequest.find({}).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender').skip((page - 1) * itemsPerPage).limit(itemsPerPage);
        res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs',  { 
            CapPhepQC,
            pagination,
            breadcrumbs,
            inform: req.flash('info'), 
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
        const chiTietCapPhepQC = await AdBoardRequest.findById(id).populate({
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
        await AdBoardRequest.findByIdAndUpdate(id, {
            status: req.body.newStatus
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}