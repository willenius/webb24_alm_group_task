const { Accomodation, User } = require("../test-setup.js")

const dummyUserData = { username: "testuser", email: "test@test.com", profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg" }

describe("Accomodation model", () => {
    it("should create an accommodation", async () => {
        const user = await User.create(dummyUserData)

        const accommodation = await Accomodation.create({
            adress: "skönviksvägen", city: "Stockholm", country: "Sweden", postalCode: 12266, roomNr: 4, userId: user.id
        })

        expect(Accomodation).toBeDefined();
        expect(accommodation.adress).toBe("skönviksvägen");
        expect(accommodation.city).toBe("Stockholm");
        expect(accommodation.country).toBe("Sweden");
        expect(accommodation.postalCode).toBe(12266);
        expect(accommodation.roomNr).toBe(4)
        expect(accommodation.userId).toBe(1)
    });

    it("should find an accomadation", async () => {
        // Build: Create a new user instance without saving it to the database
        const user = User.build({ username: "testuser", email: "invalid-email" });
        // Validate: Check if the user instance is valid
        // rejects.toThrow() is used to check if the user instance is invalid
        expect(user.validate()).rejects.toThrow();
    });
});

