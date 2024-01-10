import AdBoardChangeReq from "../../../models/adBoardChangeRequest.js";
import AdBoard from "../../../models/adBoard.js";
import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import AdLocation from "../../../models/adLocation.js";

export const dsChinhBangQC = async (req, res) => {
    const { districtId = null, wardId = null } = req.query;
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
        let ChinhBangQC = null;
        if (districtId) {
            if (wardId) {
                const ward = await Ward.findById(wardId);
                const district = await District.findById(districtId);
                const adLocation = await AdLocation.find({ district: district._id , ward: ward._id });
                const adBoard = await AdBoard.find({ adLocation: { $in: adLocation }});
                ChinhBangQC = await AdBoardChangeReq.find({adBoard: { $in: adBoard }}).populate({
                    path: 'adBoard',
                    populate: [
                        { path: 'boardType', model: 'BoardType' },
                        { path: 'adLocation', model: 'AdLocation', populate: [
                            { path: 'ward', model: 'Ward' },
                            { path: 'district', model: 'District' }
                        ]}
                    ]
                }).populate('sender')
                .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage);
            } else {
                const adLocation = await AdLocation.find({district: districtId});
                const adBoard = await AdBoard.find({ adLocation: { $in: adLocation } });
                ChinhBangQC = await AdBoardChangeReq.find({adBoard:  { $in: adBoard }}).populate({
                    path: 'adBoard',
                    populate: [
                        { path: 'boardType', model: 'BoardType' },
                        { path: 'adLocation', model: 'AdLocation', populate: [
                            { path: 'ward', model: 'Ward' },
                            { path: 'district', model: 'District' }
                        ]}
                    ]
                    }).populate('sender')
                    .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage);
            }
        } else {
            ChinhBangQC = await AdBoardChangeReq.find({}).populate({
                path: 'adBoard',
                populate: [
                    { path: 'boardType', model: 'BoardType' },
                    { path: 'adLocation', model: 'AdLocation', populate: [
                        { path: 'ward', model: 'Ward' },
                        { path: 'district', model: 'District' }
                    ]}
                ]
            }).populate('sender')
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);
        }
        const wardList = await Ward.find({}).populate({
            path: "district", model: 'District'
        });
        const districtList = await District.find({});
        
        console.log("@@: ", ChinhBangQC);
        res.render("so/hanhChinh/dsYeuCauChinhBangQC.ejs", {
            ChinhBangQC,
            pagination,
            breadcrumbs,
            wardList,
            districtList,
            districtId
        });
    } catch (err) {
        const wardList = await Ward.find({}).populate({
            path: "district", model: 'District'
            });
        const districtList = await District.find({});
        res.render("so/hanhChinh/trangBaoLoiCapPhepQC.ejs", {
            pagination,
            breadcrumbs,
            wardList,
            districtList
        });
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
    const updateStatus = req.body.newStatus;
    const bangId = req.body.adBoardId;
    try {
        if (updateStatus === "Đã duyệt") {
            const adBoardChangeReqDetails = await AdBoardChangeReq.findById(id);
            const updateAdBoard = adBoardChangeReqDetails.adBoard;
            await AdBoardChangeReq.findByIdAndUpdate(id, {
                status: updateStatus
            })
            await AdBoard.findByIdAndUpdate(bangId, updateAdBoard);
        } else {
            await AdBoardChangeReq.findByIdAndUpdate(id, {
                status: updateStatus
            })
        }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}