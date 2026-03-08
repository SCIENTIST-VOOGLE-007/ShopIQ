import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    profile:{
        // Basic info
        ageGroup:String, // "13-18", "19-25", "26-35", "36-50", "50+"
        gender:String, // "Male", "Female", "Other"
        occupation:String, // "Student", "Homemaker", "Professional", "Self-employed", "Retired"
        region:String, // "North", "South", "East", "West", "Northeast"
        
        // Shopping profile
        budgetPreference:String, // "Low (₹5K-20K)", "Medium (₹20K-50K)", "High (₹50K-100K)", "Premium (₹100K+)"
        budgetRange:{
            min:Number,
            max:Number
        },
        
        // Interests & preferences
        interests:[String], // ["Electronics", "Fashion", "Home", "Sports", etc]
        preferredBrands:[String],
        shoppingFrequency:String, // "Rarely", "Monthly", "Weekly", "Very Frequent"
        
        // Behavior signals
        confusionLevel:String, // "Very Confident", "Confident", "Neutral", "Confused", "Very Confused"
        decisionMakers:[String], // "Self", "Parents", "Friends", "Mentor", "Family"
        
        // Values
        sustainability:Boolean, // Preference for eco-friendly products
        supportLocalSellers:Boolean,
        priceVsQuality:String, // "Price is priority", "Balanced", "Quality is priority"
        
        // Additional context
        purpose:String, // "Personal use", "Gift", "Business", etc
        usageDuration:String, // "Short-term (1-2 years)", "Medium (2-3 years)", "Long-term (5+ years)"
        techSavviness:String, // "Not at all", "Basic", "Average", "Advanced"
        
        completionPercentage:Number // 0-100
    },

    shoppingHistory:{
        recentSearches:[String],
        viewedProducts:[String],
        savedComparisons:[Object],
        orders:[{
            productId:String,
            productName:String,
            price:Number,
            date:Date
        }]
    },

    preferences:{
        language:String,
        currency:String,
        notificationsEnabled:Boolean,
        reportFormat:String // "PDF", "Email", "Both"
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
    
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("User", userSchema)