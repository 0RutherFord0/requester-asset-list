document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit
      .then(function getClient(_client) {
        window.client = _client;
        client.events.on("app.activated", renderContactName);
      })
      .catch(handleErr);
  }
};

function renderContactName() {
  getRequester();
  getasset();
}
function makeTag(title, value) {
  return `<p><strong>${title}</strong></p><p> ${value}</p>`;
}
function getRequester() {
  var requesterID = document.getElementById("requester_email");
  var requesterName = document.getElementById("requester_name");
  var requesterDepartment = document.getElementById("requester_department");

  client.data
    .get("requester")
    .then(function (payload) {
      console.log("Requester Payload", payload);
      requesterID.innerHTML = makeTag(
        "Requester Department",
        payload.requester.department_names?.join(", ") ||
          payload.requester.company_names?.join(", ") ||
          "N/A"
      );
      requesterName.innerHTML = makeTag(
        "Requester Name",
        payload.requester.name
      );
      requesterDepartment.innerHTML = makeTag(
        "Requester Email",
        payload.requester.email
      );
    })
    .catch(handleErr);
}

function getasset() {
  var assetList = document.getElementById("asset");
  client.data
    .get("requesterAssets")
    .then(function (payload) {
      var assetUse = payload.requesterAssets.map((x) => x.name).join(", ");
      assetList.innerHTML = makeTag("Asset in Use List:", assetUse);
    })
    .catch(handleErr);
}

function handleErr(err = "None") {
  console.error(`Error occured. Details:`, err);
}
