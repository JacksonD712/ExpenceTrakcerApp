// api.ts

export const fetchBudgetAndTime = async (email: string) => {
  try {
    const response = await fetch(
      `https://65fef466b2a18489b386cd90.mockapi.io/api/v1/Expence?Email=${email}`,
    );
    const data = await response.json();
    const userData = data.find((item: any) => item.Email === email);
    return userData;
  } catch (error) {
    console.error('Error fetching budget and time data:', error);
    throw error;
  }
};

export const fetchExpenses = async (
  email: string,
  selectedDay: number | null,
) => {
  try {
    const response = await fetch(
      `https://65fef466b2a18489b386cd90.mockapi.io/api/v1/Exp?Email=${email}`,
    );
    const data = await response.json();
    const dayExpenses = data.filter((item: any) => item.Day === selectedDay);
    return dayExpenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};
