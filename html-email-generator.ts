class HtmlGenerator {
    constructor(private data: Record<string, any>) {}

    displayAsTable(): string {
        let tableHtml = "<table>";
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                tableHtml += `<tr><td>${key}</td><td>${this.data[key]}</td></tr>`;
            }
        }
        tableHtml += "</table>";
        return tableHtml;
    }
}

class EmailGenerator extends HtmlGenerator {
    constructor(private recipient: string, private subject: string, private emailData: Record<string, any>) {
        super(emailData);
    }

    generateBasicEmail(): string {
        const tableHtml = this.displayAsTable();

        const emailTemplate = `
            <html>
            <head></head>
            <body>
                <h2>${this.subject}</h2>
                <p>Recipient: ${this.recipient}</p>
                ${tableHtml}
            </body>
            </html>
        `;

        return emailTemplate;
    }
}

// Example usage
const data = {
    name: "John Doe",
    age: 30,
    location: "Example City"
};

const recipient = "example@email.com";
const subject = "Sample Email";

const emailGenerator = new EmailGenerator(recipient, subject, data);
const emailTemplate = emailGenerator.generateBasicEmail();
console.log(emailTemplate);

