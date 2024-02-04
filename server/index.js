const express = require("express");
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://wellyadmin:WellyPa552024@cluster0.d1vcezb.mongodb.net/?retryWrites=true&w=majority";

const cors = require('cors');

// import model schemas 
const User = require("./models/User"); 
const Post = require("./models/Post"); 
const Group = require("./models/Group");
const Goal = require("./models/Goal");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const app = express(); 
app.use(cors());

// connect mongoose 
mongoose.connect('mongodb+srv://wellyadmin:WellyPa552024@cluster0.d1vcezb.mongodb.net/welly'); 

// create application/json parser
const jsonParser = bodyParser.json(); 

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

// User routes =======================================================================================================================
/**
 * @route GET /user/:user_id 
 * @desc Get all user information
 * @access Public
 */
app.get("/users/:user_id", async (req, res) => {
    try {
      // find user
        await User.findOne({ _id: req.params.user_id })
        .populate("friends", ["username"])
		    .populate("groups", ["name", "pledge"])
        .exec()
        .then( user => {
          if(!user){
            return res.status(404).json({ message: "User not found"});
          } 
          console.log("success from server"); 
          return res.status(200).json(user); // return user
        })
        .catch(err => {
          return res.status(404).json({ message: "Something went wrong"}); 
        }); 
    } catch(err) {
        console.log(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}); 

/**
 * @route GET /users/:user_id/posts
 * @desc Get all posts belonging to a user
 * @access Public
 */
app.get("/users/:user_id/posts", async (req, res) => {
  try {
      let posts = await Post.find({ creator: req.params.user_id })
      .then(posts => {
        if(!posts){
          return res.status(200).json({ posts: [] })
        }

        return res.status(200).json({ posts: posts })
      })
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server error"}); 
  }
})

/**
 * @route POST /users/:user_id/friend
 * @desc Add a friend
 * @access Public
 */

app.post("/users/:user_id/friend", jsonParser, async (req,res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id }); 

    // add friend 
    const friend = await User.findOne({ _id: req.body.friend_id }).then(async friend => {
      if(!friend){
        return res.status(404).json({ message: "Friend not found"})
      }

      user.friends.push(new mongoose.Types.ObjectId(req.body.friend_id)); 
      friend.friends.push(new mongoose.Types.ObjectId(req.body.friend_id)); 

      await user.save(); 
      await friend.save(); 

      res.status(200).json({ message: "Added a friend"}); 
    })
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server Error"}); 
  }
}); 

/**
 * @route POST /topusers
 * @desc Get other peoples' progress
 * @access Public
 */
// for now this just returns everyone's progress, instead of just the user's friends 
app.get("/topusers", async (req, res) => {
	try {
		await User.find()
		.select(['username', 'progress'])
		.then(user => {
			if(!user){
				return res.status(404).json({ message: "Users not found"});
			}
			res.status(200).json(user);
		})
	} catch(err){
		console.log(err.message); 
		res.status(500).json({ message: "Server Error"})
	}
})

/** 
* @route POST /users
* @desc Create a user based on username
* @access Public
*/
app.post("/users", jsonParser, async (req, res) => {
  console.log("hit")
  try {
    const userData = { 
      username: req.body.username
    }; 

    console.log(userData);
    const user = new User(userData);
    await user.save(); 

    res.status(200).json(user); 
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server error"}); 
  }
}); 

// Group routes =======================================================================================================================
/**
 * @route POST /group
 * @desc Create a group
 * @access Public
 */
app.post("/group", jsonParser, async (req, res) => {
  try {
    const groupData = { 
      name: req.body.name
    }; 

    const group = new Group(groupData);
    await group.save(); 

    res.status(200).json({message: "Group created"});
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server error"})
  }
}); 

/**
 * @route GET /group/:group_id/posts
 * @desc Get all posts within a group
 * @access Public
 */
app.get("/group/:group_id/posts", async (req, res) => {
  try {
      let posts = await Post.find({ group: req.params.group_id })
      .then(posts => {
        if(!posts){
          return res.status(200).json({ posts: [] })
        }

        return res.status(200).json({ posts: posts })
      })
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server error"}); 
  }
});

/**
 * @route GET /group/:group_id
 * @desc Get all information about a group
 * @access Public
 */
app.get("/group/:group_id/pledge", async(req, res) => {
  try {
    await Group.findOne({ _id: req.params.group_id })
    .then(group => {
      if(!group){
        return res.status(404).json({ message: "Group not found"})
      }
      
      return res.status(200).json({ pledge: group.pledge });
    })
  } catch(err){
    res.status(500).json({ message: "Server Error"})
  }
})
/**
 * @route GET /user/:user_id 
 * @desc Get all user information
 * @access Public
 */
app.get("/group/:group_id", async (req, res) => {
  try {
    // find user
      await Group.findOne({ _id: req.params.group_id })
      .populate("members", ["username"])
      .exec()
      .then( group => {
        if(!group){
          return res.status(404).json({ message: "Group not found"});
        } 
        res.status(200).json(group); // return user
      })
      .catch(err => {
        return res.status(404).json({ message: "Something went wrong"}); 
      }); 
  } catch(err) {
      console.log(err.message);
      res.status(500).json({message: 'Server Error'});
  }
}); 

/**
 * @route GET /username/:user_id
 * @desc Get a user by existing username
 * @access Public
 */

app.get("/username/:username", async (req, res) => {
  try { 
    await User.findOne({ username: req.params.username })
    .populate("groups", ["name"])
    .then(user => {
      if(!user){
        return res.status(404).json({ message: "User not found"})
      }

      res.status(200).json(user); 
    })
  } catch(err){
    console.log(err.message);
    res.status(500).json({ message: "Server Error"})
  }
})
/**
 * @route POST /group/:group_id/join
 * @desc Join a group
 * @access Public
 */
app.post("/group/:group_id/join", jsonParser, async (req, res) => {
	console.log("hit")
  try {
    const user = await User.findOne({ _id: req.body.user_id }); 
    
    let group = await Group.findOne({ _id: req.params.group_id})
    .then(async group => {
      if(!group){
        return res.status(404).json({ message: "Group not found"}); 
      } 

      user.groups.push(new mongoose.Types.ObjectId(req.params.group_id));
      group.members.push(new mongoose.Types.ObjectId(req.body.user_id)); 
      
      console.log(group); 
      console.log(user); 

      await user.save()
      await group.save() 
      
      return res.status(200).json({ message: "Successfully joined group"}); 
    })

  } catch(err){
    console.log(err.message)
    res.status(500).json({ message: "Server error"}); 
  }
}); 

/**
 * @route POST /group/:group_id
 * @desc Edit a group
 * @access Public
 */

app.post("/group/:group_id", jsonParser, async (req, res) => {
  try {
    await Group.findOne({ _id: req.params.group_id })
    .then(async group => {
      if(!group){
        return res.status(404).json({ message: "Group not found"}); 
      }
      
      group.name = req.body.name 
      group.pledge = req.body.pledge 

      await group.save(); 
      res.status(200).json({ message: "Group updated"})
	  console.log(group); 
    })
  } catch(err){
    res.status(500).json({ message: "Server Error"}); 
  }
})

/**
 * @route GET /group
 * @desc Get a list of all the groups
 * @access Public
 */
app.get("/group", async (req, res) => {
  try {
    await Group.find().then(groups => {
      if(!groups){
        return res.status(404).json({ groups: []})
      }
      return res.status(200).json(groups); 
    })
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server error"}); 
  }
})

// post routes ========================================================**
/**
 * @route GET /posts
 * @desc Get every single post from the database
 * @access Public
 */
app.get("/posts", async (req, res) => {
  try {
    await Post.find()
    .populate("creator", "username")
    .then(posts => {
      if(!posts){
        return res.status(404).json({ posts: []}); 
      } 
      res.status(200).json(posts);
    })
  } catch(err){
    console.log(err.message)
    res.status(500).json({ message: "Server error"})
  }
})

/**
 * @route POST /posts/:post_id/like
 * @desc like a post
 * @access Public
 */
app.post("/posts/:post_id/like", jsonParser, async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.post_id })
    .then(async post => {
      if(!post){
        return res.status(404).json({ message: "Post not found"}); 
      }
      
      post.likes += 1

      await post.save(); 
      res.status(200).json(post);
    });
} catch(err){
  console.log(err.message); 
  res.status(500).json({ message: "Server Error"})
}}); 

/**
 * @route POST /posts/:post_id/unlike
 * @desc unlike a post
 * @access Public
 */
app.post("/posts/:post_id/unlike", jsonParser, async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.post_id })
    .then(async post => {
      if(!post){
        return res.status(404).json({ message: "Post not found"}); 
      }
      
      post.likes -= 1

      await post.save(); 
      res.status(200).json(post);
    });
} catch(err){
  console.log(err.message); 
  res.status(500).json({ message: "Server Error"})
}}); 

/* @route POST /users/:user_id/friend
* @desc Add a friend
* @access Public
*/
app.post("/users/:user_id/friend", jsonParser, async (req,res) => {
 try {
   const user = await User.findOne({ _id: req.params.user_id }); 

   // add friend 
   const friend = await User.findOne({ _id: req.body.friend_id }).then(async friend => {
     if(!friend){
       return res.status(404).json({ message: "Friend not found"})
     }

     user.friends.push(new mongoose.Types.ObjectId(req.body.friend_id)); 
     friend.friends.push(new mongoose.Types.ObjectId(req.body.friend_id)); 

     await user.save(); 
     await friend.save(); 

     res.status(200).json({ message: "Added a friend"}); 
   })
 } catch(err){
   console.log(err.message); 
   res.status(500).json({ message: "Server Error"}); 
 }
}); 

// Post routes =====================================================================================================================================================
/**
 * @route POST /posts
 * @desc Post a post to the database
 * @access Public
 */
app.post("/groups/:group_id/posts", jsonParser, async (req, res) => {
  try {
    // IMPORTANT: in the absence of auth, API calls must specify the creator directly
    const postData = {
      creator: req.body.creator, 
      photo: req.body.photo, 
      task: req.body.task, 
      group: new mongoose.Types.ObjectId(req.params.group_id)
    }

    if(req.body.public){ // if visibility is specified
      postData.public = req.body.public
    }

    // save to database 
    const post = new Post(postData); 
    await post.save(); 

    res.status(200).json({ message: "Posted" });
  } catch(err){
    console.log(err.message); 
    res.status(500).json({ message: "Server Error"});
  }
}); 

// TEMPORARY ROUTES =============================================================================================================
/**
 * @route GET /
 * @desc Test route
 * @access Public
 */

app.get("/", (req, res) => {
  res.send("Hello, World"); 
}); 

// ======================================================================================================================================================================================================

const PORT = process.env.PORT || 4000; 

// Connect database 
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("⋆⭒˚｡⋆ Database connected! ✩₊˚.⋆☾⋆⁺₊✧");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  
  run().catch(console.dir);

// Connect server
app.listen(PORT, () => console.log(`(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧
 Server running on port ${PORT}`));