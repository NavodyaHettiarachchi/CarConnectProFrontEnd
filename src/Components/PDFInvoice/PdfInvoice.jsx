import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode-generator';
import Button from '@mui/material/Button';

class PdfInvoice extends React.Component {
  generatePdf = (invoiceData) => {
    console.log("invoice data object",invoiceData);
    // if (!invoiceData || !invoiceData.selectedItems || !Array.isArray(invoiceData.selectedItems)) {
      
    //   console.error('Invoice data or selected items are missing or invalid');
    //   return;
    // }

    const {
        vehicle_id,
        fuel_type,
        model,
        mileage,
        full_Amount,
        selectedItems,
        CompanyName,
        street_1,
        street_2,
        city,
        province,
        phone,
        email,
        owner_name,
        owner_phoneNo,
    } = invoiceData;



    const billNumber = `INV-${vehicle_id}`;
    const formattedDate = new Date().toLocaleDateString();
    const formattedTime = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});;
    const discount = 10;
    const totalAmount = full_Amount - (full_Amount * discount/100);

    const qrCodeData = `${billNumber}\nDate: ${formattedDate}\nTime:
    ${formattedTime}\nvehicle id: ${vehicle_id}\nmodel:
    ${model}\nfuel type: ${fuel_type}`;
    const qr = QRCode(0, 'L');
    qr.addData(qrCodeData);
    qr.make();
    const qrCodeImage = qr.createDataURL();



    // Create a new jsPDF instance
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const pdf = new jsPDF(unit, unit, size, orientation);

    function headerText() {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(40);
    }

    function pdftext1() {
      pdf.setFont('helvetica', 'regular');
      pdf.setFontSize(12);
      pdf.setTextColor(40);
    }

    function pdftext2() {
      pdf.setFont('times', 'regular');
      pdf.setFontSize(12);
      pdf.setTextColor(40);
    }

    function footerText() {
      pdf.setFont('crimson text', 'regular');
      pdf.setFontSize(10);
      pdf.setTextColor(40);
    }

    const headerLeft = function (data) {
      pdf.setFontSize(8);
      pdf.setTextColor(40);
    //   pdf.addImage( 'PNG', 40, 20, 70, 70);
      headerText();
      pdf.text(`${CompanyName}`, 45, 35);
      pdftext2();
      pdf.text("Address: ", 45, 50);
      pdf.text(`${street_1}, ${street_2}`, 45, 63);
      pdf.text(`${city}, ${province}`, 45, 76);
      pdf.text(`email: ${email}`, 45, 89);
      pdf.text(`phone No: ${phone}`, 45, 102);
    };

    const headerRight = function (data) {
      headerText();
      pdf.text("QR", 400, 35);
      pdf.addImage(qrCodeImage, 'JPEG', 396, 37, 60, 60);
      pdftext2();
      pdf.text(`${billNumber}`, 460, 55);
      pdf.text(`${formattedDate}`, 460, 70);
      pdf.text(`${formattedTime}`, 460, 85);
    };

    const customerDetails = function (data) {
      pdf.text(`Owner:`, 45, 150);
      pdf.text(`${owner_name}`,110, 150);
      pdf.text(`Phone No:`, 45, 165);
      pdf.text(`${owner_phoneNo}`,110, 165);
      pdf.text(`Vehicle Id:`, 45, 180);
      pdf.text(`${vehicle_id}`, 110, 180);
      pdf.text(`Model:`, 360, 150);
      pdf.text(`${model}`, 430, 150);
      pdf.text(`Fuel Type:`, 360, 165);
      pdf.text(`${fuel_type}`, 430, 165);
      pdf.text('Mileage:' , 360 , 180);
      pdf.text(`${mileage}`, 430 , 180);
    };

    const addTransactionTabel = (
      pdf,
      full_Amount,
      discount,
      totalAmount,
      
    ) => {
      const full_AmountData = [['Subtotal', `Rs${full_Amount}`]];
      const discountData = [['Discount', `${discount}%`]];
      const totalAmountData = [['Total Amount', `Rs${totalAmount}`]];
      // const cashData = [['Cash', `Rs${cash}`]];
      // const balanceData = [['Balance', `Rs${balance}`]];
      const startYPosition = 250 + itemTableHeight;
      const marginAdjustment = 10;

      pdf.autoTable({
        body: [
          ...full_AmountData,
          ...discountData,
          ...totalAmountData,
        ],
        theme: 'striped',
        styles: {
          body: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        },
        margin: { top: startYPosition + marginAdjustment, left: 330 },
        tableWidth: 230,
        columnStyles: {
          1: { columnWidth: 80 },
        },
      });

      pdf.setFont('times', 'italic');
      pdf.setFontSize(10);
      pdf.text(
        "Thank you for your business.",
        60,
        pdf.autoTable.previous.finalY + marginAdjustment + 20
      );
      pdf.text(
        "Payment is due within 30 days.",
        60,
        pdf.autoTable.previous.finalY + marginAdjustment + 35
      );
      pdf.text(
        `For any inquiries, please contact us at ${email}.`,
        60,
        pdf.autoTable.previous.finalY + marginAdjustment + 50
      );
      pdftext1();
      pdf.text(
        "Thank You!",
        250,
        pdf.autoTable.previous.finalY + marginAdjustment + 100
      );
    };

    const headers = [
      'No',
      'Type',
      'Item',
      'Unit Price',
      'Quantity',
      'TotalPrice',
    ];
    const data = selectedItems.map((item, index) => [
      index + 1,
      item.Type,
      item.Item,
      item.Price,
      item.Quantity,
      item.Total,
    ]);
    const itemTableHeight = selectedItems.length * 20;

    pdf.autoTable({
      head: [headers],
      body: data,
      theme: 'striped',
      styles: {
        head: { fillColor: [38, 2, 97], textColor: [255, 255, 255] },
        body: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      },
      columnStyles: {
        0: { columnWidth: 40 },
        1: { columnWidth: 170 },
        2: { columnWidth: 80 },
        3: { columnWidth: 80 },
        4: { columnWidth: 70 },
        5: { columnWidth: 80 },
      },
      margin: { top: 220 },
      addPageContent: function (data) {
        pdf.setFontSize(8);
        pdf.setTextColor(40);
        headerLeft(data);
        headerRight(data);
        pdf.line(20, 120, 580, 120);
        customerDetails(data);
        pdf.line(20, 190, 580, 190);
        addTransactionTabel(
          pdf,
          full_Amount,
          discount,
          totalAmount,
        );
        pdf.line(20, 800, 580, 800);
        footerText();
        pdf.text('© 2023 Car Connect Pro. All rights reserved.', 210, 815);
        // pdf.text('Wellamadama, Matara , 0412223334', 230, 830);
      },
    });
    
    pdf.save('invoice.pdf');
    // // const Invoice = pdf.save('invoice.pdf');
    // // // Invoice.output('dataurlnewwindow');
    // // return Invoice;

    // const pdfDataUri = pdf.output('datauri');
    // const pdfWindow = window.open(pdfDataUri, ' ');
    
    // if (!pdfWindow) {
    //   alert('Please allow pop-ups for this site');
    // }
  };

  render() {
    return (
      <div>
        <Button variant="outlined" onClick={() => this.generatePdf(this.props.invoiceData)} >Open & Download Invoice</Button>
      </div>
    );
  }
}

export default PdfInvoice;



