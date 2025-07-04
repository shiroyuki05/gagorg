
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/our-team', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'team.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});


app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Contact Form Submission Received:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

 
    const suggestedTeamMember = "Our AI suggests Jan Patrick Tagalog for project inquiries.";

    res.json({
        success: true,
        message: 'Your message has been received!',
        suggestion: suggestedTeamMember
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Open your browser to: http://localhost:${port}`);
});
