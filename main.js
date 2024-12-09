var _a, _b, _c, _d;
// Add event listeners with null checks
(_a = document.getElementById('generateResume')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', updatePreview);
(_b = document.getElementById('downloadPDF')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', downloadPDF);
(_c = document.getElementById('copyURLButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', copyShareableURL);
(_d = document.getElementById('profilePicture')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', previewProfilePicture);
function updatePreview() {
    // Update all fields in the preview section, using optional chaining or non-null assertions
    document.getElementById('previewFullName').innerText =
        document.getElementById('fullName').value || "Full Name";
    document.getElementById('previewFname').innerText =
        "".concat(document.getElementById('fname').value || "Father's Name");
    document.getElementById('Cnic').innerText =
        "".concat(document.getElementById('cnic').value || "CNIC");
    document.getElementById('previewEmail').innerText =
        "".concat(document.getElementById('email').value || "Email");
    document.getElementById('previewPhone').innerText =
        "".concat(document.getElementById('phone').value || "Phone");
    document.getElementById('previewAddress').innerText =
        "".concat(document.getElementById('address').value || "Address");
    document.getElementById('previeweducation').innerText =
        "".concat(document.getElementById('education').value || "Education");
    document.getElementById('previewExperience').innerText =
        "".concat(document.getElementById('experience').value || "Experience");
    document.getElementById('previewSkills').innerText =
        "".concat(document.getElementById('skills').value || "Skills");
    document.getElementById('previewInterest').innerText =
        "".concat(document.getElementById('Interest').value || "Interests");
    // Show the preview section
    document.getElementById('previewSection').style.display = 'block';
    // Generate a unique shareable URL using input data
    var resumeData = {
        fullName: document.getElementById('fullName').value,
        fname: document.getElementById('fname').value,
        cnic: document.getElementById('cnic').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        education: document.getElementById('education').value,
        experience: document.getElementById('experience').value,
        skills: document.getElementById('skills').value,
        interest: document.getElementById('Interest').value
    };
    var uniqueURL = "".concat(window.location.origin).concat(window.location.pathname, "?data=").concat(btoa(JSON.stringify(resumeData)));
    document.getElementById('shareableURL').value = uniqueURL;
}
function previewProfilePicture(event) {
    var _a;
    var fileInput = event.target;
    var file = (_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            document.getElementById('previewProfilePic').innerHTML =
                "<img src=\"".concat((_a = e.target) === null || _a === void 0 ? void 0 : _a.result, "\" alt=\"Profile Picture\" width=\"100\" />");
        };
        reader.readAsDataURL(file);
    }
}
function downloadPDF() {
    var resumeElement = document.getElementById('resumePreview');
    if (resumeElement) {
        html2pdf().from(resumeElement).save('Resume.pdf');
    }
}
function copyShareableURL() {
    var shareableURL = document.getElementById('shareableURL');
    if (shareableURL) {
        shareableURL.select();
        document.execCommand('copy');
        alert('URL copied to clipboard!');
    }
}
// Load data from URL if available (for shared links)
window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('data')) {
        var decodedData = JSON.parse(atob(urlParams.get('data') || ''));
        document.getElementById('fullName').value = decodedData.fullName;
        document.getElementById('fname').value = decodedData.fname;
        document.getElementById('cnic').value = decodedData.cnic;
        document.getElementById('email').value = decodedData.email;
        document.getElementById('phone').value = decodedData.phone;
        document.getElementById('address').value = decodedData.address;
        document.getElementById('education').value = decodedData.education;
        document.getElementById('experience').value = decodedData.experience;
        document.getElementById('skills').value = decodedData.skills;
        document.getElementById('Interest').value = decodedData.interest;
        // Update the preview with loaded data
        updatePreview();
    }
};
