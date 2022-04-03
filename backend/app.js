const express = require('express'),
app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var cors = require("cors");
app.use(cors());

const contractABI = require('./config.json').contractABI;
const contractAddress = require('./config').contractAddress;
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.get('/',(req,res)=>{
    res.send("hai");
})

app.get('/getAccount',async(req,res)=>{
    
    let accounts = await web3.eth.getAccounts();
    console.log("accounts:",accounts);
    web3.eth.defaultAccount = accounts[0]; // Gets the default account
    console.log(web3.eth.defaultAccount + ' account detected');
    res.send(web3.eth.defaultAccount);
    
})

app.get('/getGoals',async(req,res)=>{
    let goals = []
    
    
		try {
			numberOfTask = await contract.methods.getEasyGoalsCount().call({ from: web3.eth.defaultAccount });
			
			console.log("Number of Tasks are " + numberOfTask);
			
			if (numberOfTask != 0) {
				
				console.log("Start fetching task ...");
				let taskIterator = 0;
				while (taskIterator < numberOfTask) {
					try {
						let task = await contract.methods.getEasyGoal(taskIterator).call({ from: web3.eth.defaultAccount });
						if (task[0] != "") {
							// addTaskToList add this task as children to the ul tag //
							//addTaskToList(taskIterator, task[0], task[1]);
                            console.log("task:",task);
                            goals.push({'goalName':task[0],'completed':task[1]});
						} else {
							console.log("The index " + taskIterator + " is empty");
						}
					} catch {
						console.log("Failed to get Task " + taskIterator);
					}
					taskIterator++;
				}
				// Update the task count in HTML //
				res.send(goals);
			}
            else{
                res.send("No Goals");
            }
		} catch {
			console.log("Failed to get task count from blockchain");
}
})

app.put('/updateGoal/:index/:goal',async(req,res)=>{
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        //console.log("inside update goal",req)
        //console.log("req.body.index:",req.params.goal);
        await contract.methods.updateEasyGoal(req.params.index,req.params.goal).call({ from: web3.eth.defaultAccount });
        
        res.send('updated goal');
        
        
    } catch {
        console.log("Failed to get task count from blockchain");
    }
})

app.post('/createGoal',async(req,res)=>{
    try {
        //console.log("inside update goal",req)
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("req.body.goal:",req.body.goal);
        await contract.methods.addEasyGoal("Goal3").call({ from: web3.eth.defaultAccount });
        //console.log("task:",task);
        res.send('updated goal');
        
        
    } catch {
        console.log("Failed to get task count from blockchain");
    }
})

app.put('/updateEasyGoalStatus/:index/:status',async(req,res)=>{
    
    try {
        //console.log("inside update goal",req)
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("req.params.status:",req.params.status);
       // await contract.methods.updateEasyGoalStatus(req.params.index,req.params.status).call({ from: web3.eth.defaultAccount });
       
       let count = await contract.methods.getEasyGoalsCount().call({ from: web3.eth.defaultAccount });
        console.log("count:",count);
        res.send('updated goal');
        
        
    } catch {
        console.log("Failed to get task count from blockchain");
    }
})





app.listen(3500, ()=>{
    console.log("listening on port 3500");
})