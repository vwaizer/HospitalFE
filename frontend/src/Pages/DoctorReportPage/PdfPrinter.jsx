// import jsPDF from 'jspdf';
import { Margin } from "@mui/icons-material";
import jsPDFInvoiceTemplate ,{ OutputType, jsPDF } from "jspdf-invoice-template";
import { PureComponent } from 'react';
import { DoctorSearchProvider } from "../../context/DoctorSearchContext";


        // <Typography>Treatment ID: {data.treatmentID}</Typography>
        // <Typography>Result : {data.result}</Typography>
        // <Typography>Start date: {data.startDate}</Typography>
        // <Typography>End date : {data.endDate}</Typography>
        // <Typography>Doctor: {data.doctor}</Typography>
        // <Typography>Medication used: </Typography>
        // {/* {data.medications.map((medication, index) => {
        //   return (
        //     <Typography key={index}>
        //       - {medication.name} x {medication.quantity} : {medication.priceperbox * medication.quantity} $
        //     </Typography>
        //   );
        // })} */}
        // <Typography>Total fee: {data.totalFee} $</Typography>
export function pdfGenerate(headers, data) {
  var tableData;
  var totalPrice = data.reduce((total, row) => total + row[7], 0);
  if (headers.length > 0 && headers[0].title === "ExamineID") {

    // ExamineID [0]
    // Result [1]
    // Exam date [2]
    // Next exam [3]
    // Diagnosis [4]
    // Doctor [5]
    // Medication [6] [7] [8]
    // fee [9]
    // Total fee [10]
    tableData = data.map((row) => {
      return [
        row[0] ? row[0] + '\n' + '\n' : '',
        row[1] ? row[1] : '',
        row[2] ? row[2] : '',
        row[3] ? row[3] : '',
        row[4] ? row[4] : '',
        row[5] ? row[5] : '',
        row[6] && row[7] ? row[6] + ' x ' + row[7] + ' : ' + row[8] + ' $' : '',
        row[9] ? row[9] + ' $' : '',
        row[10] ? row[10] + ' $' : '',
      ];
    });
    totalPrice = data.reduce((total, row) => total + parseFloat(row[10]) || 0, 0);
  } else {
    // TreatmentID [0]
    // Result [1] 
    // Start date [2]
    // End date [3]
    // Doctor [4]
    // Medication [5] [6] [7] 
    // fee [8]
    // Total fee [9]
    tableData = data.map((row) => {
      return [
        row[0] ? row[0] + '\n' + '\n' : '',
        row[1] ? row[1] : '',
        row[2] ? row[2] : '',
        row[3] ? row[3] : '',
        row[4] ? row[4] : '',
        row[5] && row[6] ? row[5] + ' x ' + row[6] + ': ' + row[7] + ' $': '',
        row[8] ? row[8] + ' $' : '',
        row[9] ? row[9] + ' $' : '',
      ];
    });
    totalPrice = data.reduce((total, row) => total + parseFloat(row[9]) || 0, 0);
  }
  
  var props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    // logo: {
    //   src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
    //   type: 'PNG', //optional, when src= data:uri (nodejs case)
    //   width: 26.33, //aspect ratio = width/height
    //   height: 26.33,
    //   margin: {
    //     top: 0, //negative or positive num, from the current position
    //     left: 0 //negative or positive num, from the current position
    //   }
    // },
    // stamp: {
    //   inAllPages: true, //by default = false, just in the last page
    //   src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
    //   type: 'JPG', //optional, when src= data:uri (nodejs case)
    //   width: 20, //aspect ratio = width/height
    //   height: 20,
    //   margin: {
    //     top: 0, //negative or positive num, from the current position
    //     left: 0 //negative or positive num, from the current position
    //   }
    // },

    business: {
      name: "Hospital management system",
      address: "HCM city, Viet Nam",
      phone: "(+355) 069 11 11 111",
      email: "email@example.com",
      email_1: "info@example.al",
      website: "www.example.al",
    },
    contact: {
      label: "Invoice issued for:",
      name: "Client Name",
      address: "Albania, Tirane, Astir",
      phone: "(+355) 069 22 22 222",
      email: "client@website.al",
      otherInfo: "www.website.al",
    },
    invoice: {
      invDate: "Payment Date: 01/01/2021 18:12",
      invGenDate: "Invoice Date: 02/02/2021 10:17",
      headerBorder: false,
      tableBodyBorder: false,
      header: headers,
      table: tableData,
      // table: Array.from(Array(0), (item, index) => ([
      //   index + 1,
      //   "There are many variations ",
      //   "Lorem Ipsum is simply dummy text dummy text ",
      //   200.5,
      //   4.5,
      //   "ALL \n",
      //   400.5
      // ])),
      additionalRows: [{
        col1: 'Total:',
        col2: totalPrice.toString() + ' $',
        style: {
          fontSize: 14 //optional, default 12
        }
      }],
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };
  var pdfCreated = jsPDFInvoiceTemplate(props); //returns number of pages created
  // pdfCreated.jsPDFDocObject.save(); //or .output('<outputTypeHere>');

}