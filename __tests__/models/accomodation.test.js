const { Accomodation, User } = require("../test-setup.js")

const dummyUserData = { username: "testuser", email: "test@test.com", profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg" }

describe("Accomodation model", () => {
    let user;
    beforeEach(async () => {
        this.user = await User.create(dummyUserData)
    })
    it("should create an accommodation", async () => {

        const accommodation = await Accomodation.create({
            adress: "skönviksvägen",
            city: "Stockholm",
            country: "Sweden",
            postalCode: 12266,
            rent: 40000,
            roomNr: 4,
            userId: this.user.id
        })

        expect(Accomodation).toBeDefined();
        expect(accommodation.adress).toBe("skönviksvägen");
        expect(accommodation.city).toBe("Stockholm");
        expect(accommodation.country).toBe("Sweden");
        expect(accommodation.postalCode).toBe(12266);
        expect(accommodation.rent).toBe(40000);
        expect(accommodation.roomNr).toBe(4)
        expect(accommodation.userId).toBe(1)
    });

    it("should not create an accomodations without adress", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "",
                city: "Stockholm",
                country: "Sweden",
                postalCode: 12266,
                roomNr: 4,
                rent: 40000,
                userId: this.user.id
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("adress")
        }
    });

    it("should not create an accomodations without city", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "skönviksvägen",
                city: "",
                country: "Sweden",
                postalCode: 12266,
                roomNr: 4,
                rent: 40000,
                userId: this.user.id
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("city")
        }
    });

    it("should not create an accomodations without country", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "skönviksvägen",
                city: "Stockholm",
                country: "",
                postalCode: 12266,
                roomNr: 4,
                rent: 40000,
                userId: this.user.id
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("country")
        }
    });

    it("should not create an accomodations without postalCode with length greater or lowe then 5", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "skönviksvägen",
                city: "Stockholm",
                country: "Sweden",
                postalCode: 1212,
                roomNr: 4,
                rent: 40000,
                userId: this.user.id
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("postalCode")
        }

        //jag tror vi behöver ha NaN el liknande. vi får kolla på det strax
    });

    it("should not create an accomodations without roomNr", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "skönviksvägen",
                city: "Stockholm",
                country: "Sweden",
                postalCode: 12266,
                roomNr: null,
                rent: 40000,
                userId: this.user.id
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("roomNr")
        }
    });

    it("should not create an accomodations without rent being less than 1", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "skönviksvägen",
                city: "Stockholm",
                country: "Sweden",
                postalCode: 12266,
                roomNr: 4,
                rent: null,
                userId: this.user.id
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("rent")
        }
    });

    it("should not create an accomodations without userId", async () => {
        expect.assertions(2)
        try {
            const accommodation = await Accomodation.create({
                adress: "skönviksvägen",
                city: "Stockholm",
                country: "Sweden",
                postalCode: 12266,
                roomNr: 4,
                rent: 40000,
                userId: 0
            })
        } catch (error) {
            expect(error.errors.length).toBe(1)
            expect(error.errors[0].path).toBe("userId")
        }
    });


    // it("should find an accomadation", async () => {
    //     const accommodation = await Accomodation.create({
    //         adress: "skönviksvägen",
    //         city: "Stockholm",
    //         country: "Sweden",
    //         postalCode: 12266,
    //         roomNr: 4,
    //         rent: 40000,
    //         userId: this.user.id
    //     })
    //     const found = await Accomodation.findByPk(accommodation.id);
    //     expect(found).not.toBeNull();
    //     expect(found.id).toBe(accommodation.id);
    //     expect(found.city).toBe("Stockholm");
    //     expect(found.country).toBe("Sweden");
    //     expect(found.postalCode).toBe(12266);
    //     expect(found.roomNr).toBe(4);
    //     expect(found.rent).toBe(40000);
    //     expect(found.userId).toBe(1);
    // });

    it("should delete a user and CASCADE delete the accomodation.", async () => {
        let user = this.user; 
        console.log(user)

        const accomadation = await Accomodation.create({
            adress: "skönviksvägen",
            city: "Stockholm",
            country: "Sweden",
            postalCode: 12266,
            roomNr: 4,
            rent: 40000,
            userId: user.id
        });
        await user.destroy()
        const foundAfter = await Accomodation.findByPk(accomadation.id)
        expect(foundAfter).toBeNull();
    });


});

