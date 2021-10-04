export class BasicMaths{

    public convertNumberToBillions(num){
        let billion = num / 1000000000
        return billion;
    }

    valueFormat(value,decimals) {
        // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
        return isNaN(value) ? value : parseFloat(value).toFixed(decimals);
      }

    public getPrice(num1, num2) {
        let res = num1 * num2;
        return this.valueFormat(res,2);
    }
}