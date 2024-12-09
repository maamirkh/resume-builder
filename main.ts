declare const html2pdf:any;
// Add event listeners with null checks
document.getElementById('generateResume')?.addEventListener('click', updatePreview);
document.getElementById('downloadPDF')?.addEventListener('click', downloadPDF);
document.getElementById('copyURLButton')?.addEventListener('click', copyShareableURL);
document.getElementById('profilePicture')?.addEventListener('change', previewProfilePicture);

function updatePreview() {
  // Update all fields in the preview section, using optional chaining or non-null assertions
  (document.getElementById('previewFullName') as HTMLHeadingElement).innerText = 
      (document.getElementById('fullName') as HTMLInputElement).value || "Full Name";
  (document.getElementById('previewFname') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('fname') as HTMLInputElement).value || "Father's Name"}`;
  (document.getElementById('Cnic') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('cnic') as HTMLInputElement).value || "CNIC"}`;
  (document.getElementById('previewEmail') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('email') as HTMLInputElement).value || "Email"}`;
  (document.getElementById('previewPhone') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('phone') as HTMLInputElement).value || "Phone"}`;
  (document.getElementById('previewAddress') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('address') as HTMLInputElement).value || "Address"}`;
  (document.getElementById('previeweducation') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('education') as HTMLTextAreaElement).value || "Education"}`;
  (document.getElementById('previewExperience') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('experience') as HTMLTextAreaElement).value || "Experience"}`;
  (document.getElementById('previewSkills') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('skills') as HTMLTextAreaElement).value || "Skills"}`;
  (document.getElementById('previewInterest') as HTMLParagraphElement).innerText = 
      `${(document.getElementById('Interest') as HTMLTextAreaElement).value || "Interests"}`;

      // Show the preview section
  (document.getElementById('previewSection') as HTMLElement).style.display = 'block';



  // Generate a unique shareable URL using input data
  const resumeData = {
    fullName: (document.getElementById('fullName') as HTMLInputElement).value,
    fname: (document.getElementById('fname') as HTMLInputElement).value,
    cnic: (document.getElementById('cnic') as HTMLInputElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    phone: (document.getElementById('phone') as HTMLInputElement).value,
    address: (document.getElementById('address') as HTMLInputElement).value,
    education: (document.getElementById('education') as HTMLTextAreaElement).value,
    experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
    skills: (document.getElementById('skills') as HTMLTextAreaElement).value,
    interest: (document.getElementById('Interest') as HTMLTextAreaElement).value
  };
  const uniqueURL = `${window.location.origin}${window.location.pathname}?data=${btoa(JSON.stringify(resumeData))}`;
  (document.getElementById('shareableURL') as HTMLInputElement).value = uniqueURL;
}

function previewProfilePicture(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      (document.getElementById('previewProfilePic') as HTMLDivElement).innerHTML = 
          `<img src="${e.target?.result}" alt="Profile Picture" width="100" />`;
    };
    reader.readAsDataURL(file);
  }
}

function downloadPDF() {
  const resumeElement = document.getElementById('resumePreview');
  if (resumeElement) {
    html2pdf().from(resumeElement).save('Resume.pdf');
  }
}

function copyShareableURL() {
  const shareableURL = document.getElementById('shareableURL') as HTMLInputElement;
  if (shareableURL) {
    shareableURL.select();
    document.execCommand('copy');
    alert('URL copied to clipboard!');
  }
}

// Load data from URL if available (for shared links)
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('data')) {
    const decodedData = JSON.parse(atob(urlParams.get('data') || ''));
    (document.getElementById('fullName') as HTMLInputElement).value = decodedData.fullName;
    (document.getElementById('fname') as HTMLInputElement).value = decodedData.fname;
    (document.getElementById('cnic') as HTMLInputElement).value = decodedData.cnic;
    (document.getElementById('email') as HTMLInputElement).value = decodedData.email;
    (document.getElementById('phone') as HTMLInputElement).value = decodedData.phone;
    (document.getElementById('address') as HTMLInputElement).value = decodedData.address;
    (document.getElementById('education') as HTMLTextAreaElement).value = decodedData.education;
    (document.getElementById('experience') as HTMLTextAreaElement).value = decodedData.experience;
    (document.getElementById('skills') as HTMLTextAreaElement).value = decodedData.skills;
    (document.getElementById('Interest') as HTMLTextAreaElement).value = decodedData.interest;
    
    // Update the preview with loaded data
    updatePreview();
  }
};
