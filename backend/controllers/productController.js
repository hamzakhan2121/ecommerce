const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');


//get all product 
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage =8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    let products = await apiFeature.query;

    // let filteredProductsCount = products.length;

    // apiFeature.pagination(resultPerPage);

    // products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
    });
}
);

//Create Product  --admin 
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});


//Update product --Admin  
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    if(images !== undefined){
        for (let i = 0; i < product.images.length; i++) {
        
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images=imagesLinks;
    }
    if (!product) {

        return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    res.status(200).json({
        success: true,
        product
    })
}
)

//delete product 
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {

        return next(new ErrorHandler("Product not found", 404));

    }

    //deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted successfully"
    })
}
)


//get Product details 
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product,
    })
})

//create New Review or Update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString())
                (review.rating = rating), (review.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((review) => {
        avg += review.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

//get All reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString())
    let avg = 0;

    reviews.forEach((review) => {
        avg += review.rating;
    });

    let ratings=0;
    if(reviews.length === 0){
        ratings=0
    }
    else
    {
    ratings = avg / reviews.length;
    }
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
})

//get All Products  --admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        products,
    });
}
);