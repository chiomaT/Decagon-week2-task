const input = [
  {
    name: "Hendrick",
    dob: "1853-07-18T00:00:00.000Z",
    regNo: "041",
  },
  {
    name: "Albert",
    dob: "1879-03-14T00:00:00.000Z",
    regNo: "033",
  },
  {
    name: "Marie",
    dob: "1867-11-07T00:00:00.000Z",
    regNo: "024",
  },
  {
    name: "Neils",
    dob: "1885-10-07T00:00:00.000Z",
    regNo: "02",
  },
  {
    name: "Max",
    dob: "1858-04-23T00:00:00.000Z",
    regNo: "014",
  },
  {
    name: "Erwin",
    dob: "1887-08-12T00:00:00.000Z",
    regNo: "09",
  },
  {
    name: "Auguste",
    dob: "1884-01-28T00:00:00.000Z",
    regNo: "08",
  },
  {
    name: "Karl",
    dob: "1901-12-05T00:00:00.000Z",
    regNo: "120",
  },
  {
    name: "Louis",
    dob: "1892-08-15T00:00:00.000Z",
    regNo: "022",
  },
  {
    name: "Arthur",
    dob: "1892-09-10T00:00:00.000Z",
    regNo: "321",
  },
  {
    name: "Paul",
    dob: "1902-08-08T00:00:00.000Z",
    regNo: "055",
  },
  {
    name: "William",
    dob: "1890-03-31T00:00:00.000Z",
    regNo: "013",
  },
  {
    name: "Owen",
    dob: "1879-04-26T00:00:00.000Z",
    regNo: "052",
  },
  {
    name: "Martin",
    dob: "1871-02-15T00:00:00.000Z",
    regNo: "063",
  },
  {
    name: "Guye",
    dob: "1866-10-15T00:00:00.000Z",
    regNo: "084",
  },
  {
    name: "Charles",
    dob: "1868-02-14T00:00:00.000Z",
    regNo: "091",
  },
];

function classifier(input) {
  let sortedInput = sortInput(input);
  let groups = groupAge(sortedInput);
  const outputs = mapGroup(groups);

  return (outputs)
}

// get members age
function findMembersAge(year) {
  const getYear = 2019;
  return getYear - new Date(year).getFullYear()

}


// Sort given inputs
function sortInput(input) {
  return [...input].sort((a, b) => findMembersAge(a.dob) - findMembersAge(b.dob))
}
// Group Age
function groupAge(sortedInput) {
  let groups = [];
  let newGroup = [];
  let firstAdded;
  sortedInput.forEach((e) => {
    const age = findMembersAge(e.dob);
    e.age = age;
    if (!firstAdded) {
      firstAdded = e;
    }
    if (newGroup.length == 3 || e.age - firstAdded.age > 5) {
      groups.push(newGroup);
      newGroup = [];
      firstAdded = e;
    }
    newGroup.push(e);
  });

  if (newGroup.length > 0) {
    groups.push(newGroup);
  }
  return groups;
}

//loop through the group to get output
function mapGroup(groups) {
  let output = {
    noOfGroups: 0,
  };

  groups.forEach((e, i) => {
    output.noOfGroups += 1;
    let members = [];
    let oldest = 0;
    let sum = 0;
    let regNos = [];

    e.forEach(g => {
      members.push(g);
      oldest = Math.max(oldest, g.age);
      sum += g.age;
      regNos.push(parseInt(g.regNo));
    })

    regNos.sort((a, b) => {
      return a - b;
    });

    output[`group${i + 1}`] = { members, sum, oldest, regNos };
  });

  return output;
}



export default classifier;
