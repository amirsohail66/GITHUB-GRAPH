const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");

// Change the working directory to where your local repository is located
const git = simpleGit("../GitHub_Graph");

const makeCommit = async (n) => {
  if (n === 0) {
    try {
      await git.push("origin", "master");
      console.log("All commits pushed to remote repository");
    } catch (err) {
      console.error("Error pushing to remote:", err);
    }
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: DATE,
  };
  console.log(DATE);

  try {
    await jsonfile.writeFile(FILE_PATH, data);
    await git.add([FILE_PATH]);
    await git.commit(DATE, { "--date": DATE });
    console.log(`Commit ${121 - n} created`);
    await makeCommit(--n);
  } catch (err) {
    console.error("Error creating commit:", err);
  }
};

makeCommit(120);