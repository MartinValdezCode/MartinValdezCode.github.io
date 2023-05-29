const productDescription = document.getElementById("product-description");


const amountInput = document.getElementById("amount-input");
const totalAmount = document.getElementById("total-amount");

let count = 0;

amountInput.addEventListener("input", () => {
  count = amountInput.value;
  updateTotalAmount();
});

const updateTotalAmount = () => {
  const updatedAmount = count * 1;
  totalAmount.innerText = updatedAmount;
};

const mercadopago = new MercadoPago("APP_USR-46374983-f640-4bdc-b5f8-b3b89a1807ef", {
  locale: "es-AR", 
});

document.getElementById("checkout-btn").addEventListener("click", function () {
  const orderData = {
    quantity: 1,
    description: productDescription.innerText,
    price: totalAmount.innerText,
  };

  fetch("http://localhost:8080/create_preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);
    })
    .catch(function () {
      alert("Unexpected error");
    });
});

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    await bricksBuilder.create(
      "wallet",
      "button-checkout", 
      {
        initialization: {
          preferenceId: preferenceId,
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {},
        },
      }
    );
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
