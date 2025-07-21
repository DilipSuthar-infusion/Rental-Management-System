import Property from "../models/property.model.js"

export const addProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            pricePerNight,
            address, 
            country, 
            state, 
            city,
            zipCode, 
            amenities, 
            propertyType, 
            guestCapacity, 
            bedrooms, 
            availableFrom, 
            availableTo
                       } = req.body
  
    const newProperty  = await Property.create({
        title : title,
        description: description,
        pricePerNight: pricePerNight,
        address: address, 
        country: country, 
        state: state, 
        city: city,
        zipCode: zipCode, 
        amenities: amenities, 
        propertyType: propertyType, 
        guestCapacity: guestCapacity, 
        bedrooms:bedrooms, 
        availableFrom: availableFrom, 
        availableTo: availableTo,
        userId:req.user.id,
        isActive: false
    })
    await newProperty.save();
    res.status(200).json({
        message: "Added Successfully"
    })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
}
}



export const updatePropertyStatus = async(req, res)=>{
    try {
        const { status } = req.body;
        const {propertyId} = req.params;
        const property = await Property.findOne({where:{id:propertyId}});
        if(!property){
           return res.status(404).json({
                message: "Property not found"
            })
        }
        property.status = status;
        await property.save()
        res.status(200).json({
            message: "accept property"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}



export const updateProperty = async (req, res) => {
    try {
        const {propertyId} = req.params;

        const updateproperty = await Property.findOne({ where: { id: propertyId } })

        if(!updateproperty){
            res.status(404).json({
                message: "Property not found"
            })
        }
        if(updateproperty.userId != req.user.id){
            res.status(400).json({
                message: "you are not owner of this property"
            })
        }
        Object.assign(updateproperty, req.body)
    await updateproperty.save();
    res.status(200).json({
        message: "update Successfully"
    })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
}
}



export const deleteProperty = async(req,res) =>{
    try {
        const {propertyId} = req.params;
        const property = await Property.findOne({where:{id: propertyId}});
        if(!property){
            return res.status(404).json({message:"No propety found"})
        }
        if(property.userId != req.user.id){
            return res.status(400).json({message:"You are not owner of this property"})
        }
        await property.destroy()
        res.status(200).json({message:"Deleted Successsfully"})
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}



export  const getAllPropertyList = async (req,res)=>{
    try {
        const propertiesList = await Property.findAll();
        if(!propertiesList){
            return res.status(404).json({message:"No properties found"})
        }
        res.status(200).json(propertiesList)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}


export const getAllProperty = async(req, res)=>{
    try {
        const properties = await Property.findAll({attributes:[
            "id", "title","latitude", "longitude","pricePerNight", "city", "images", "state"
        ]});
        if(!properties){
            return res.status(404).json({message:"No properties found"})
        }
        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}


export const getProperty = async(req, res)=>{
    try {
        const {propertyId} = req.params;
        const property = await Property.findOne({where:{id:propertyId},
                include: [
                    {
                      model: User,
                      attributes: ['id', 'username', 'email', 'role'],
                    },
                  ]
        });
        if(!property){
            return res.status(404).json({message:"No property found"})
        }
        res.status(200).json(property)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}


export const getNearByProperties = async(req,res)=>{
    try {
        const {latitude, longitude, radius = 10} = req.body;
        const nearestProperties = await Property.findAll({
            where: literal(`
                (
                  ${R} * acos(               
                    cos(radians(${latitude}))              
                    * cos(radians("latitude"))              
                    * cos(radians("longitude") - radians(${longitude})) 
                    + sin(radians(${latitude}))           
                    * sin(radians("latitude"))             
                  )
                ) <= ${radius}              
              `)
        })
        if(!nearestProperties){
            return res.status(404).json({message:"No nearest property found"})
        }
        return res.status(200).json(nearestProperties)
    } catch (error) {
        
    }
  

}


