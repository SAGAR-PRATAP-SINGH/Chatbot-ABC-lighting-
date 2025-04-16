class DataService {
    constructor() {
        this.companyInfo = {
            name: "ABC Lighting Corp",
            locations: [
                "123 Solar Way, Brightville, CA 92101",
                "456 Luminous Drive, Glowtown, NY 10001"
            ],
            business_hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed"
        };

        this.products = {
            street_light: {
                name: "Victorian Solar Street Light",
                id: "SL-2000",
                specifications: {
                    dimensions: "72\" x 24\" x 24\"",
                    brightness: "6000 lumens",
                    runtime: "12-14 hours per charge",
                    mounting_height: "12-15 feet"
                },
                price: 1299.99,
                warranty: "5 years",
                image_path: "/assets/street_light.jpg"
            },
            driveway_light: {
                name: "PathBrite Solar Bollard Light",
                id: "DL-500",
                specifications: {
                    dimensions: "36\" x 6\" x 6\"",
                    brightness: "800 lumens",
                    runtime: "10-12 hours per charge",
                    mounting_height: "3 feet"
                },
                price: 249.99,
                warranty: "3 years",
                image_path: "/assets/driveway_light.jpg"
            },
            wall_light: {
                name: "StepGlow Solar Wall Sconce",
                id: "WL-100",
                specifications: {
                    dimensions: "8\" x 4\" x 3\"",
                    brightness: "400 lumens",
                    runtime: "8-10 hours per charge",
                    mounting: "Wall mounted"
                },
                price: 79.99,
                warranty: "2 years",
                image_path: "/assets/wall_light.jpg"
            }
        };
    }

    getCompanyInfo() {
        return this.companyInfo;
    }

    getProductInfo(productType) {
        return this.products[productType];
    }

    getAllProducts() {
        return Object.values(this.products);
    }

    getProductImage(productType) {
        const product = this.products[productType];
        if (!product) return null;
        return product.image_path;
    }
}

module.exports = new DataService();