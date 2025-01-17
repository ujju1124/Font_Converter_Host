$(document).ready(function() {
    const apiKey = 'AIzaSyCS7oSXVqDkr-WQ-S80EZNyVb-tqzd2Kbw'; // API Key
    const fontSelector = $('#fontSelector');
    const convertedText = $('#convertedText');
    const userText = $('#userText');
    const fontWeight = $('#fontWeight');
    const fontStyle = $('#fontStyle');

    // Fetch Google Fonts List using the Google Fonts API
    $.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`, function(data) {
        const fonts = data.items;

        // Populate the font selector dropdown
        fonts.forEach(font => {
            fontSelector.append(new Option(font.family, font.family));
        });

        // Initialize Select2 for font search functionality
        fontSelector.select2();

        // Function to update the converted text with selected font, weight, and style
        function updateConvertedText() {
            const selectedFont = fontSelector.val();
            const selectedWeight = fontWeight.val();
            const selectedStyle = fontStyle.val();

            // Dynamically add link tag for selected font
            if (selectedFont) {
                const link = document.createElement('link');
                link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, '+')}&display=swap`;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }

            // Apply the selected font, weight, and style to the converted text
            convertedText.css({
                'font-family': selectedFont || 'Arial', // default to Arial if no font selected
                'font-weight': selectedWeight || 'normal', // default to normal weight if none selected
                'font-style': selectedStyle || 'normal' // default to normal style if none selected
            });

            // Update the content inside #convertedText div
            convertedText.text(userText.val());
        }

        // Call updateConvertedText whenever there's an input change in the textarea
        userText.on('input', function() {
            updateConvertedText();
        });

        // Font selector change event
        fontSelector.on('change', function() {
            updateConvertedText();
        });

        // Font weight or style change events
        fontWeight.on('change', function() {
            updateConvertedText();
        });

        fontStyle.on('change', function() {
            updateConvertedText();
        });

        // Initialize the default font settings
        updateConvertedText();
    });

    // Save Text as PDF
  // Save Text as PDF with Styles




});
