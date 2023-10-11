// -------------------------index.ejs & imguploaded.ejs------------------------

document.querySelector("#sj-main").style.backgroundImage = "url(./images/uploads/<%= sj %>)";

document.querySelector("#img").addEventListener("click", function () {
  document.querySelector("#inpimg").click();
});

document.querySelector("#inpimg").addEventListener("change", function () {
  document.querySelector("#imgform").submit();
});

// --------------------------------imgupload.ejs-------------------------------

document.querySelector("#greyscale").addEventListener("click", function () {
  axios.get("/greyscale").then(function (data) {
    document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
    document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
  });
});

document.querySelector("#invert").addEventListener("click", function () {
  axios.get("/invert").then(function (data) {
    document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
    document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
  });
});

document.querySelector("#blurrange").addEventListener("input", function () {
  document.querySelector("#blurspan").textContent = document.querySelector("#blurrange").value + "%";
});

document.querySelector("#blur").addEventListener("click", function () {
  axios
    .get(`/blur/${document.querySelector("#blurrange").value}`)
    .then(function (data) {
      document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
      document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
    });
});

let hmirror = true;
document.querySelector("#hmirror").addEventListener("input", function () {
  hmirror = true;
});

document.querySelector("#vmirror").addEventListener("input", function () {
  hmirror = false;
});

document.querySelector("#mirror").addEventListener("click", function () {
  axios.get(`/mirror/${hmirror}`).then(function (data) {
    document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
    document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
  });
});

document.querySelector("#square").addEventListener("click", function () {
  axios.get("/square").then(function (data) {
    document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
    document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
  });
});

document.querySelector("#rotate").addEventListener("click", function () {
  axios
    .get(`/rotate/${document.querySelector("#degree").value}`)
    .then(function (data) {
      document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
      document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
    });
});

document.querySelector("#brightrange").addEventListener("input", function () {
  document.querySelector("#brightspan").textContent = document.querySelector("#brightrange").value + "%";
});

document.querySelector("#bright").addEventListener("click", function () {
  axios
    .get(`/brightness/${document.querySelector("#brightrange").value}`)
    .then(function (data) {
      document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
      document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
    });
});

document.querySelector("#contrastrange").addEventListener("input", function () {
  document.querySelector("#contrastspan").textContent = document.querySelector("#contrastrange").value + "%";
});

document.querySelector("#contrast").addEventListener("click", function () {
  axios
    .get(`/contrast/${document.querySelector("#contrastrange").value}`)
    .then(function (data) {
      document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
      document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
    });
});

document.querySelector("#normalize").addEventListener("click", function () {
  axios.get(`/normalize`).then(function (data) {
    document.querySelector( "#img img" ).src = `./images/edited/${data.data.name}`;
    document.querySelector( "#downloadbtn" ).href = `./images/edited/${data.data.name}`;
  });
});
