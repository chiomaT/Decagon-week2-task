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
