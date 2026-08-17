const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign-In JWT Token Verification & Registration
exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ error: 'Google ID Token (credential) is required' });
        }

        // Verify Google JWT Signature & Audience
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        if (!email) {
            return res.status(400).json({ error: 'Google account does not contain a valid email address' });
        }

        // Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            console.log(`Registering new user via Google Sign-In: ${email}`);
            user = new User({
                provider: 'google',
                name,
                email,
                avatar: picture
            });
            await user.save();
        } else {
            console.log(`User logged in via Google: ${email}`);
            let updated = false;
            if (user.name !== name) { user.name = name; updated = true; }
            if (user.avatar !== picture) { user.avatar = picture; updated = true; }
            if (updated) {
                await user.save();
            }
        }

        return res.json({
            status: 'success',
            data: user
        });

    } catch (error) {
        console.error('Error verifying Google Token:', error.message);
        return res.status(401).json({ error: 'Google login failed: ' + error.message });
    }
};

// Safe Getter endpoint to expose public Google Client ID configuration
exports.getConfig = (req, res) => {
    return res.json({
        googleClientId: process.env.GOOGLE_CLIENT_ID || ''
    });
};

exports.oauthLogin = async (req, res) => {
    try {
        const { provider, name, email, avatar } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required for authentication' });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            console.log(`Registering new user: ${email} via ${provider}`);
            user = new User({
                provider,
                name,
                email,
                avatar
            });
            await user.save();
        } else {
            console.log(`User logged in: ${email}`);
            // Optionally update details if they changed
            let updated = false;
            if (user.name !== name) { user.name = name; updated = true; }
            if (user.avatar !== avatar) { user.avatar = avatar; updated = true; }
            if (user.provider !== provider) { user.provider = provider; updated = true; }
            if (updated) {
                await user.save();
            }
        }

        return res.json({
            status: 'success',
            data: user
        });

    } catch (error) {
        console.error('Error in oauthLogin controller:', error.message);
        return res.status(500).json({ error: 'Authentication failed: ' + error.message });
    }
};
