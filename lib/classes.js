class User {
  constructor(
    Id,
    Password,
    Username,
    Firstname,
    Birthday,
    Gender,
    Phone,
    Email,
    Bodykey,
    Checkday,
    Height = "",
    Weight = "",
    Upper,
    Shoulder,
    Arm,
    Waist,
    Leg,
    Fit,
    Brand,
    Vibe,
    Type,
    Esg,
    Chest,
    Tummy,
    Bra_size,
    Bra_cup,
    Hip = ""
  ) {
    this.Id = Id;
    this.Password = Password;
    this.Username = Username;
    this.Firstname = Firstname;
    this.Birthday = Birthday;
    this.Gender = Gender;
    this.Phone = Phone;
    this.Email = Email;
    this.Bodykey = Bodykey;
    this.Checkday = Checkday;
    this.Height = Height;
    this.Weight = Weight;
    this.Upper = Upper;
    this.Shoulder = Shoulder;
    this.Arm = Arm;
    this.Waist = Waist;
    this.Leg = Leg;
    this.Fit = Fit;
    this.Brand = Brand;
    this.Vibe = Vibe;
    this.Type = Type;
    this.Esg = Esg;
    this.Chest = Chest;
    this.Tummy = Tummy;
    this.Bra_size = Bra_size;
    this.Bra_cup = Bra_cup;
    this.Hip = Hip;
  }
}

export { User };
