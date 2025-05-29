#!/bin/bash
# Run tests for New Day Mortgage application

# Create project directory if it doesn't exist
mkdir -p newdaymortgage-test

# Navigate to project directory
cd newdaymortgage-test

# Initialize npm project if package.json doesn't exist
if [ ! -f "package.json" ]; then
    echo "Initializing npm project..."
    npm init -y
fi

# Install Jest dependencies
echo "Installing Jest and dependencies..."
npm install --save-dev jest jest-environment-jsdom

# Configure package.json for Jest
echo "Configuring package.json for Jest..."
node -e "
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.test = 'jest --env=jsdom';
    
    packageJson.jest = {
      'testEnvironment': 'jsdom',
      'verbose': true
    };
    
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
"

# Copy test file to current directory
echo "Copying test file..."
cp ../tests/newdaymortgage.test.js ./

# Run tests
echo "Running tests..."
npm test

echo "Test run complete!"
