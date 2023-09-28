let userFrm = document.getElementById("usr-frm");
var UserEntry = [];

let errors = [];
const retrieveE = () => {
  let entries = localStorage.getItem("UserEntry");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
const displayEntry = () => {
  let entries = retrieveE();
  const tbleEntries = entries
     .map((entry) => {
      const nameCell = `<td>${entry.name}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const acceptTermsCell = `<td>${entry.acceptTerms}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");
  const table = ` <table class='table table-bordered'>
    <tr>
    <th>Name </th>
    <th>Email </th>
    <th>Password </th>
    <th>Dob </th>
    <th>Accepted terms? </th>
    </tr>${tbleEntries}
</table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUsrForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;
  var currentYear = new Date().getFullYear();
  var birthYear = dob.split("-");
  let year = birthYear[0];
  var age = currentYear - year;
  console.log({ age, currentYear, birthYear });
  if (age < 18 || age > 55) {
    document.getElementById("dob").style = "border:1px solid red";
    return alert("Your age must be under 18 and 55 years");
  } else {
    document.getElementById("dob").style = "border:none";

    const entry = {
      name,
      email,
      password,
      dob,
      acceptTerms,
    };
    UserEntry = retrieveE();
    UserEntry.push(entry);
    localStorage.setItem("UserEntry", JSON.stringify(UserEntry));
    displayEntry();
    userFrm.reset();
  }
};
userFrm.addEventListener("submit", saveUsrForm);
displayEntry();
