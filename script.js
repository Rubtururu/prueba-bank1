document.addEventListener('DOMContentLoaded', async () => {
    // Cambiar la dirección del contrato y otros detalles según sea necesario
    const contractAddress = '0x29D1Bf24a79C7d1FB8681C83ab738fB78E39a660';
    let userAddress;

    // Conectar con MetaMask u otro proveedor web3
     if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            userAddress = accounts[0];
            document.getElementById('userAddress').textContent = userAddress;

            const contract = new web3.eth.Contract(contractAbi, contractAddress);
            updateUI(contract);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('Web3 not found. Please install MetaMask.');
    }
});

async function updateUI(contract) {
    const totalDeposits = await contract.methods.totalDeposits().call();
    const userDividends = await contract.methods.userDividends(userAddress).call();
    const lastDividendClaim = await contract.methods.lastDividendClaim(userAddress).call();

    document.getElementById('totalDeposits').textContent = totalDeposits;
    document.getElementById('userDividends').textContent = userDividends;
    document.getElementById('lastDividendClaim').textContent = new Date(lastDividendClaim * 1000).toLocaleString();
}

async function approve() {
    const contract = new web3.eth.Contract(contractAbi, 'DIRECCION_DEL_CONTRATO_USDT');
    const amountToApprove = web3.utils.toWei('1000000', 'ether'); // Ajusta según sea necesario

    try {
        await contract.methods.approve(contractAddress, amountToApprove).send({ from: userAddress });
        console.log('Aprobación exitosa');
    } catch (error) {
        console.error('Error al aprobar:', error);
    }
    // Actualizar la interfaz después de la aprobación
    const updatedContract = new web3.eth.Contract(contractAbi, contractAddress);
    updateUI(updatedContract);
}

async function deposit() {
    const depositAmount = document.getElementById('depositAmount').value;
    if (depositAmount > 0) {
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        try {
            await contract.methods.deposit(depositAmount).send({ from: userAddress });
            updateUI(contract);
        } catch (error) {
            console.error(error);
        }
    }
}

async function withdraw() {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    try {
        await contract.methods.withdraw().send({ from: userAddress });
        updateUI(contract);
    } catch (error) {
        console.error(error);
    }
}

async function claimDividends() {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    try {
        await contract.methods.claimDividends().send({ from: userAddress });
        updateUI(contract);
    } catch (error) {
        console.error(error);
    }
}

async function withdrawDividends() {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    try {
        await contract.methods.withdrawDividends().send({ from: userAddress });
        updateUI(contract);
    } catch (error) {
        console.error(error);
    }
}
