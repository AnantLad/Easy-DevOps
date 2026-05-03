const shell = require('shelljs');

const labTasks = [
    {
        id: 1,
        description: "Create a group named 'easy-devops'.",
        check:"getent group easy-devops"
    },
    {
        id: 2,
        description: "Create a user named 'dev-user' and assign it to the 'easy-devops' group.",
        check:"id dev-user| grep easy-devops"
    }
];
async function runLabChecks(containerName) {

    for (let task of labTasks) {
    console.log(`Checking Task ${task.id}: ${task.description}...`);

    const result = shell.exec(`docker exec ${containerName} ${task.check}`, { silent: true });

    if(result.code === 0) {
        console.log("Success : Task Completed");
    } else {
        console.log("Failed : Task Failed.Keep trying...");
    }
}
}

runLabChecks("lab-server");