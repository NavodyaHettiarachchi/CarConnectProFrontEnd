import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode-generator';
import { invoiceData } from '../../Data/invoiceData';

class PdfInvoice extends React.Component {
  generatePdf = () => {

    const {
        totalAmount,
        billNumber,
        formattedDate,
        formattedTime,
        selectedCustomerName,
        selectedCustomerContact,
        // fullname,
        vehicleId,
        // CompanyLogo,
        CompanyName,
        street_1, street_2, 
        city, 
        province, 
        phone, 
        email,
        selectedItems,
        subTotal,
        discount,
        cash,
        balance,
        noteText1,
        noteText2,
        noteText3,
    } = invoiceData;

    const qrCodeData = `${billNumber}\nDate: ${formattedDate}\nTime:
    ${formattedTime}\nCustomer: ${selectedCustomerName}\nCustomer Contact:
    ${selectedCustomerContact}\nUser: ${vehicleId}`;
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
      pdf.text(`${CompanyName}`, 115, 35);
      pdftext2();
      pdf.text(`${street_1 , street_2}`, 115, 50);
      pdf.text(`${city}`, 115, 63);
      pdf.text(`${province}`, 115, 76);
      pdf.text(`${email}`, 115, 89);
      pdf.text(`${phone}`, 115, 102);
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
      pdf.text(`Customer Name:`, 45, 150);
      pdf.text(`${selectedCustomerName}`, 140, 150);
      pdf.text(`Customer Mobile:`, 45, 165);
      pdf.text(`${selectedCustomerContact}`, 140, 165);
      pdf.text(`Vehicle Id:`, 360, 150);
      pdf.text(`${vehicleId}`, 430, 150);
    };

    const addTransactionTabel = (
      pdf,
      subTotal,
      discount,
      totalAmount,
      cash,
      balance
    ) => {
      const subTotalData = [['Subtotal', `Rs${subTotal}`]];
      const discountData = [['Discount', `${discount}%`]];
      const totalAmountData = [['Total Amount', `Rs${totalAmount}`]];
      const cashData = [['Cash', `Rs${cash}`]];
      const balanceData = [['Balance', `Rs${balance}`]];
      const startYPosition = 250 + itemTableHeight;
      const marginAdjustment = 10;

      pdf.autoTable({
        body: [
          ...subTotalData,
          ...discountData,
          ...totalAmountData,
          ...cashData,
          ...balanceData,
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
        noteText1,
        60,
        pdf.autoTable.previous.finalY + marginAdjustment + 20
      );
      pdf.text(
        noteText2,
        60,
        pdf.autoTable.previous.finalY + marginAdjustment + 35
      );
      pdf.text(
        noteText3,
        60,
        pdf.autoTable.previous.finalY + marginAdjustment + 50
      );
      pdftext1();
      pdf.text(
        "Thank You!",
        230,
        pdf.autoTable.previous.finalY + marginAdjustment + 100
      );
    };

    const headers = [
      'No',
      'Item/Type',
      'Item Code',
      'Unit Price',
      'Quantity',
      'TotalPrice',
    ];
    const data = selectedItems.map((item, index) => [
      index + 1,
      item.itemName,
      item.itemCode,
      `Rs${item.unitPrice}`,
      item.quantity,
      `Rs${item.totalPrice}`,
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
          subTotal,
          discount,
          totalAmount,
          cash,
          balance
        );
        pdf.line(20, 800, 580, 800);
        footerText();
        pdf.text('© 2023 Car Connect Pro. All rights reserved.', 210, 815);
        // pdf.text('Wellamadama, Matara , 0412223334', 230, 830);
      },
    });
    
    pdf.save('invoice.pdf');
  };

  render() {
    return (
      <div>
        <h1>PDF Invoice Generator</h1>
        <button onClick={this.generatePdf}>Generate PDF</button>
      </div>
    );
  }
}

export default PdfInvoice;



