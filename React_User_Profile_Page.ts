import React, { useState } from 'react';

export default function UserProfile() {
    // 1. Set up state for all our form fields
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        bio: ''
    });
    const [profilePic, setProfilePic] = useState(null);

    // 2. Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 3. Handle file input change (for the image preview)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a temporary URL to preview the image
            setProfilePic(URL.createObjectURL(file));
        }
    };

    // 4. Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the browser from reloading the page
        console.log("Saving profile data:", formData);
        console.log("Profile picture file:", profilePic);
        // Here you would typically send the data to your backend API
        alert("Profile saved successfully!");
    };

    // 5. The JSX (Your HTML converted to React)
    return (
        <form onSubmit= { handleSubmit } style = {{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }
}>

    <label>Upload Profile Picture </label>
        < input
type = "file"
accept = "image/*"
onChange = { handleImageChange }
    />

    {/* Only show the image if they uploaded one */ }
{
    profilePic && (
        <img 
          src={ profilePic }
    alt = "Profile Preview"
    style = {{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }
} 
        />
      )}
<br />

    < label > Full Name </label>
        < input
type = "text"
name = "fullName"
value = { formData.fullName }
onChange = { handleChange }
    />
    <br />

    < label > Email </label>
    < input
type = "email"
name = "email"
value = { formData.email }
onChange = { handleChange }
    />
    <br />

    < label > Phone Number </label>
        < input
type = "tel"
name = "phoneNumber"
value = { formData.phoneNumber }
onChange = { handleChange }
    />
    <br />

    < label > Bio </label>
    < textarea
name = "bio"
value = { formData.bio }
onChange = { handleChange }
rows = "4"
    />
    <br />

    < button type = "submit" > Submit </button>
        </form>
  );
}
