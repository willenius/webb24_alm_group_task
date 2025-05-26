const { User } = require("../test-setup");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({ 
      username: "testuser", 
      email: "test@test.com", 
      profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg" 
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profilePicture).toBe("https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg")
  });

  it("should validate email contains @", async () => {
    expect.assertions(2);
    try {
      await User.create({
        username: "testuser",
        email: "test-test.com", 
        profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg"
      });
    } catch (error) {
      expect(error.errors.length).toBe(1)
      expect(error.errors[0].path).toBe("email");
    }
  });

  it("should check if username is unique", async () => {
    await User.create({
      username: "testuser",
        email: "test@test.com", 
        profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg"
    });

    await expect(
        User.create({
        username: "testuser",
        email: "test@test2.com", 
        profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg"
      })
    ).rejects.toThrow();
  })

  it("should check if email is unique", async () => {
    await User.create({
      username: "testuser",
        email: "test@test.com", 
        profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg"
    });

    await expect(
        User.create({
        username: "testuser2",
        email: "test@test.com", 
        profilePicture: "https://wallpapers.com/images/featured/super-roliga-bilder-iduwjp1gpohrve6r.jpg"
      })
    ).rejects.toThrow();
  })

  it("should test if profilePicture valid URL", async () => {
    expect.assertions(2);
    try {
      await User.create({
        username: "testuser",
        email: "test@test.com",
        profilePicture: ""
      });
    } catch (error) {
      expect(error.errors.length).toBe(1)
      expect(error.errors[0].path).toBe("profilePicture");
    }
  })

});

