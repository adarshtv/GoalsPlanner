// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Goals {

    struct EasyGoals{
        string goalName;
        bool completed;
    }


    struct Milestone{
        string milestoneName;
        uint daysRemaining;
        bool completed;
    }

    //Milestone[] public ms;

    //mapping (address=>Milestone[]) private UserMilestones;

    //mapping (uint=>Milestone) milestoneType;

    struct ComplexGoals{
        string goalName;
        //mapping (uint=>Milestone) UserMilestones;
        bool completed;
        Milestone[] UserMilestones;
    }

    ComplexGoals public cg;

    mapping (address=>EasyGoals[]) private UserEasyGoals;
    mapping (address=>ComplexGoals[]) public UserComplexGoals;

    function addEasyGoal(string calldata goalName) external {
        UserEasyGoals[msg.sender].push(EasyGoals({
            goalName: goalName,
            completed: false
        }));
    }

    function getEasyGoal(uint index) external view returns(EasyGoals memory) {
        return UserEasyGoals[msg.sender][index];
    }

    function updateEasyGoal(uint index, string calldata goalName) external {
        UserEasyGoals[msg.sender][index].goalName = goalName;
    }

    function updateEasyGoalStatus(uint index, bool status) external {
        UserEasyGoals[msg.sender][index].completed = status;
    }

    function deleteEasyGoal(uint index) external {
        delete UserEasyGoals[msg.sender][index];
    }

    function getEasyGoalsCount() view external returns(uint) {
        return UserEasyGoals[msg.sender].length;
    }



    function addComplexGoals(string calldata goalName, Milestone[] memory ms) external {
        

        //Milestone memory s;
        //ComplexGoals memory cg1;
        cg.goalName =goalName;
        cg.completed = false;
        for(uint i=0;i<ms.length;i++){
            cg.UserMilestones.push(ms[i]);
        }
        //ComplexGoals storage cg = UserComplexGoals[msg.sender][UserComplexGoals[msg.sender].length];
        //cg.push(cg1);
        UserComplexGoals[msg.sender].push(cg);
        // UserComplexGoals[msg.sender].push(cg1({
        //     goalName: goalName,
        //     completed: false
        // }));
        //cg.goalName = goalName;
        
    }

    function getComplexGoals(uint index) external view returns(ComplexGoals memory){
        return UserComplexGoals[msg.sender][index];
    }

    function updateComplexGoal(uint index, string calldata goalName) external {
        UserComplexGoals[msg.sender][index].goalName = goalName;
    }

    function updateComplexGoalStatus(uint index, bool status) external {
        UserComplexGoals[msg.sender][index].completed = status;
    }

    function updateComplexGoalMilestone(uint goalIndex, uint milestoneIndex,Milestone memory milestone) external {
        UserComplexGoals[msg.sender][goalIndex].UserMilestones[milestoneIndex] = milestone;
    }

    function addComplexGoalMilestone(uint goalIndex,Milestone memory milestone) external {
        UserComplexGoals[msg.sender][goalIndex].UserMilestones.push(milestone);
    }

    function deleteComplexGoalMilestone(uint goalIndex, uint milestoneIndex) external {
        delete UserComplexGoals[msg.sender][goalIndex].UserMilestones[milestoneIndex];
    }

    function deleteComplexGoal(uint index) external {
        delete UserComplexGoals[msg.sender][index];
        
    }

    function getComplexGoalsCount() view external returns(uint) {
        return UserComplexGoals[msg.sender].length;
    }

    function getComplexGoalsMilestonesCount(uint goalIndex) view external returns(uint) {
        return UserComplexGoals[msg.sender][goalIndex].UserMilestones.length;
    }
}