const express = require("express")
const app = express()


const { initializeDatabase } = require("./db/db.connect")
const Hotel = require("./models/hotel.models")

const cors = require("cors")
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // middlerware

app.use(express.json()) // middleware

initializeDatabase() //call the fn


// 1. Write a function to create a new hotel data given below.

// const newHotel = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
// };

// 2. Run the same function to create another hotel data in the database.

// const newHotel = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// };

async function createNewData(newHotel){
  try{
    const hotel = new Hotel(newHotel)
    const saveHotel = await hotel.save()
    // console.log("Save hotel:",saveHotel)
    return saveHotel;
  } catch(error){
    throw error
  }
}

// 1. Create an API with route "/hotels" to create a new hotel data in the Database. Test your API with Postman.

app.post("/hotels", async (req, res) => {
    try {
      const savedHotel = await createNewData(req.body)
      res.status(201).json({ message: "Hotel added successfully.", hotel: savedHotel })
    } catch(error){
      res.status(500).json({ error: "Failed to add hotel data in db."})
    }
})

// 3. Create a function to read all hotels from the database. Console all the hotels. Use proper function and variable names.

// get all hotels

async function readAllHotel(){
  try{
    const allHotels = await Hotel.find()
    // console.log(allHotels)
    return allHotels;
  } catch(error){
    console.log(error)
  }
}


// 1. Create an API with route "/hotels" to read all hotels from the Database. Test your API with Postman.

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotel()
    if(hotels.lenght != 0){
      res.json(hotels)
    } else {
      res.status(404).json({ error: "Hotel not found."})
    }
  } catch(error) {
    res.status(500).json({ error: "Failed to fetch data"})
  }
})

// 4. Create a function to read a hotel by its name ("Lake View"). Console the restaurant details of Lake View hotel. Use proper function and variable names.

// get hotel by name

async function getHotelByName(hotelName){
  try{
    const hotelByName = await Hotel.findOne({ name: hotelName })
    // console.log(hotelByName)
    return hotelByName;
  } catch(error){
    console.log(error)
  }
}

// 2. Create an API with route "/hotels/:hotelName" to read a hotel by its name. Test your API with Postman.

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotels = await getHotelByName(req.params.hotelName)
    if(hotels.length != 0){
      res.json(hotels)
    } else {
      res.status(404).json({ error: "Hotel not found."})
    }
  } catch(error){
    res.status(500).json({ error: "Failed to fetch database."})
  }
})

// 5. Create a function to read all hotels which offers parking space. Console all the hotel details.

// read all hotels which offers parking space..

async function getAllHotelWithParking(parkingSpace){
  try{
    const readAllHotel = await Hotel.find({ isParkingAvailable: parkingSpace })
    console.log(readAllHotel)
  } catch(error){
    console.log(error)
  }
}

// getAllHotelWithParking(true)

// 6. Create a function to read all hotels which has restaurant available. Console all the hotels.

async function getAllHotelByRestaurant(restaurant){
  try{
    const readAllHotel = await Hotel.find({ isRestaurantAvailable: restaurant })
    console.log(readAllHotel)
  } catch(error){
    console.log(error)
  }
}

// getAllHotelByRestaurant(true)

// 7. Create a function to read all hotels by category ("Mid-Range"). Console all the mid range hotels.

// read all hotel by category:

async function getAllHotelByCategory(hotelCategory){
  try{
    const readAllHotels = await Hotel.find({ category: hotelCategory })
    // console.log(readAllHotels)
    return readAllHotels;
  } catch(error){
    console.log(error)
  }
}

// 5. Create an API with route "/hotels/category/:hotelCategory" to read all hotels by category. Test your API with Postman.

app.get("/hotels/category/:hotelCategory", async (req, res) => {
    try {
      const hotels = await getAllHotelByCategory(req.params.hotelCategory)
      if(hotels.length != 0){
        res.json(hotels)
      } else {
        res.status(404).json({ error: "Hotel not found."})
      }
    } catch(error) {
      res.status(500).json({ error: "Failed to fetch database."})
    }
})

// 8. Create a function to read all hotels by price range ("$$$$ (61+)"). Console all the hotels.

// read all hotels by price range:

async function readHotelByPriceRange(priceRange){
  try{
    const readAllHotels = await Hotel.find({ priceRange: priceRange })
    console.log(readAllHotels)
  } catch(error){
    console.log(error)
  }
}
// readHotelByPriceRange("$$$$ (61+)")

// 9. Create a function to read all hotels with 4.0 rating. Console the hotels.

// read all hotels by rating:

async function readAllHotelByRating(hotelRating){
  try{
    const readAllHotels = await Hotel.find({ rating: hotelRating })
    // console.log(readAllHotels)
    return readAllHotels;
  } catch(error){
    console.log(error)
  }
}

// 4. Create an API with route "/hotels/rating/:hotelRating" to read all hotels by rating. Test your API with Postman.

app.get("/hotels/rating/:hotelRating", async (req, res) => {
    try {
      const hotels = await readAllHotelByRating(req.params.hotelRating)
      if(hotels.length != 0){
        res.json(hotels)
      } else {
        res.status(404).json({ error: "Hotel not found."})
      }
    } catch (error){
      res.status(500).json({ error: "Failed to fetch database."})
    }
})

// 10. Create a function to read a hotel by phone number ("+1299655890"). Console the hotel data.

// read hotel by phone number: 

async function readHotelByPhoneNumber(phoneNumber){
  try{
    const readHotelByPhone = await Hotel.find({ phoneNumber: phoneNumber })
    // console.log(readHotelByPhone)
    return readHotelByPhone;
  } catch(error){
    console.log(error)
  }
}

// 3. Create an API with route "/hotels/directory/:phoneNumber" to read a hotel by phone number. Test your API with Postman.

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
    try{
      const hotels = await readHotelByPhoneNumber(req.params.phoneNumber)
      if(hotels.length != 0){
        res.json(hotels)
      } else {
        res.status(404).json({ error: "Hotel not found."})
      }
    } catch(error){
      
    }
})

//  1. Create a function that accepts a hotel ID and an object with updated data, and updates the hotel data with the provided ID. Take the _id of the hotel from your database which has the name Lake View and update its checkOutTime to 11 AM. Console the updated hotel

async function updateHotel(hotelId, dataToUpdate){
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, { new: true })
    // console.log(updatedHotel)
    return updatedHotel;
  } catch(error){
    console.log("Error while changing the data.", error)
  }
}

// updateHotel("67a97519fc40db616dade279", { checkOutTime: "11 AM" })


app.post("/hotels/:hotelId", async (req, res) => {
    try{
      const updatedHotel = await updateHotel(req.params.hotelId, req.body )
      console.log(updatedHotel)
      if(updatedHotel){
        res.status(200).json({ message: "Hotel updated successfully.", hotel: updatedHotel })
      } else {
        res.status(404).json({ error: "Hotel not found."})
      }
    } catch(error) {
      res.status(500).json({ error: "Failed to update hotel."})
    }
})

// 2. Create a function that accepts a hotel name and an object with updated data, and updates the hotel data. Take the hotel which has the name "Sunset Resort" and update its rating to 4.2. Console the updated hotel.

async function updateHotelData(hotelName, dataToUpdate){
  try{
    const updatedData = await Hotel.findOneAndUpdate({ name: hotelName }, dataToUpdate, { new: true })
    console.log(updatedData)
  } catch(error){
    console.log("Error while changing the data.", error)
  }
}
// updateHotelData("Sunset Resort", { rating: 4.2})

// 3. Create a function that accepts a hotel's phone number and an object with updated data, and updates the hotel data. Take the hotel which has the phone number "+1299655890" and update its phone number  to "+1997687392". Console the updated hotel details.
async function updateHotelsData(phoneNumber, dataToUpdate){
  try{
    const updateData = await Hotel.findOneAndUpdate({phoneNumber: phoneNumber}, dataToUpdate, { new: true })
    console.log(updateData)
  } catch(error){
    console.log('Error while changing the data', error)
  }
}
// updateHotelsData("+1299655890", { phoneNumber: "+1997687392" })

// 1. Create a function deleteHotelById that accepts a hotel ID and deletes the hotel data from the db. Take any hotel id from your database and delete the records of that hotel.

// delete hotel by id:

async function deleteHotelById(hotelId){
  try{
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
    return deletedHotel;
  } catch(error){
    console.log("Error while deleting hotel data", error)
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
    try{
      const deleteHotel = await deleteHotelById(req.params.hotelId)
      if(deleteHotel){
        res.status(200).json({ message: "Hotel deleted successfully.", hotel: deleteHotel })
      } 
    } catch(error){
      res.status(500).json({ errror: "Failed to delete hotel."})
    }
})


// 2. Create a function deleteHotelByPhoneNumber that accepts a hotel's phone number and deletes the hotel data from the db. Take any hotel phone number from your database and delete the records of that hotel.

async function deleteHotelByPhoneNumber(hotelPhoneNumber){
  try {
    const deletedData = await Hotel.findOneAndDelete({phoneNumber: hotelPhoneNumber })
    console.log("Deleted data:", deletedData)
  } catch(error){
    console.log("Error while deleting hotel data from db.", error)
  }

}
// deleteHotelByPhoneNumber("+1234567890")


const PORT  = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`)
})