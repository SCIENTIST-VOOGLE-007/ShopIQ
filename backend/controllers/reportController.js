import PDFDocument from "pdfkit"



export const generateReport = async(req,res)=>{

    const {products,userRequirement} = req.body

    const doc = new PDFDocument()

    res.setHeader("Content-Type","application/pdf")

    doc.pipe(res)

    doc.fontSize(20).text("ShopIQ Product Comparison Report")

    doc.moveDown()

    doc.text("User Requirement: " + userRequirement)

    doc.moveDown()

    products.forEach(product=>{

        doc.text(`Product: ${product.title}`)
        doc.text(`Price: ${product.price}`)
        doc.text(`Rating: ${product.rating}`)
        doc.moveDown()

    })

    doc.end()

}