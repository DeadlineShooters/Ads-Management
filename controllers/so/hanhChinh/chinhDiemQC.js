import AdLocationChangeRequest from "../../../models/adLocationChangeRequest.js"
import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import AdLocation from "../../../models/adLocation.js";

export const dsChinhDiemQC = async (req, res) => {
    const { districtId = null, wardId = null } = req.query;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    
    const breadcrumbs = [];
    try {
        let ChinhDiemQC = null;
        if (districtId) {
            if (wardId) {
                const ward = await Ward.findById(wardId);
                const district = await District.findById(districtId);
                const adLocation = await AdLocation.find({ district: district._id , ward: ward._id });
                ChinhDiemQC = await AdLocationChangeRequest.find({"adLocation._id": { $in: adLocation }}).populate({
                    path: 'adLocation',
                    populate: [
                        { path: 'ward', model: 'Ward'  },
                        { path: 'district', model: 'District'},
                        { path: 'type', model: 'LocationType'},
                        { path: 'adType', model: 'AdType'},
                    ]
                }).populate('sender')
                // .skip((page - 1) * itemsPerPage)
                // .limit(itemsPerPage);
            } else {
                const adLocation = await AdLocation.find({district: districtId});
                ChinhDiemQC = await AdLocationChangeRequest.find({"adLocation._id":  { $in: adLocation }}).populate({
                    path: 'adLocation',
                    populate: [
                        { path: 'ward', model: 'Ward'  },
                        { path: 'district', model: 'District'},
                        { path: 'type', model: 'LocationType'},
                        { path: 'adType', model: 'AdType'},
                    ]
                }).populate('sender')
                // .skip((page - 1) * itemsPerPage)
                // .limit(itemsPerPage);
            }
        } else {
            ChinhDiemQC = await AdLocationChangeRequest.find({}).populate({
                path: 'adLocation',
                populate: [
                    { path: 'ward', model: 'Ward'  },
                    { path: 'district', model: 'District'},
                    { path: 'type', model: 'LocationType'},
                    { path: 'adType', model: 'AdType'},
                ]
            }).populate('sender')
            // .skip((page - 1) * itemsPerPage)
            // .limit(itemsPerPage);
        }
        const wardList = await Ward.find({}).populate({
            path: "district", model: 'District'
        });
        const districtList = await District.find({});

        const totalItems = ChinhDiemQC.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pagination = {
            page,
            totalPages,
            itemsPerPage,
        };
        ChinhDiemQC = ChinhDiemQC.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        
        // console.log("@@: ", ChinhDiemQC);
        res.render("so/hanhChinh/dsYeuCauChinhDiemQC.ejs", {
            ChinhDiemQC,
            pagination,
            breadcrumbs,
            wardList,
            districtList,
            districtId
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
        const chiTietChinhDiemQC = await AdLocationChangeRequest.findById(id).populate({
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
    const updateStatus = req.body.newStatus;
    const diemId = req.body.adLocationId;
    try {
        if (updateStatus === "Đã duyệt") {
            const adLocationChangeReqDetails = await AdLocationChangeRequest.findById(id);
            const updateAdLocation = adLocationChangeReqDetails.adLocation;
            await AdLocationChangeRequest.findByIdAndUpdate(id, {
                status: updateStatus
            })
            await AdLocation.findByIdAndUpdate(diemId, updateAdLocation);
        } else {
            await AdLocationChangeRequest.findByIdAndUpdate(id, {
                status: updateStatus
            })
        }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}