class UsersController {
  register = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/register
     *
     *    INPUT (body): {
     *      email: string,
     *      password: string,
     *      imagen?: file
     *    }
     *
     *    OUTPUT:
     *      - En caso de exito: 200 - "Registrado correctamente"
     *      - En caso de error:
     *        - Faltan inputs: 400 - "Email y password son requeridos"
     *        - Validacion de la contraseña: 400 - "La password no cumple con las validaciones"
     *        - Email ya registrado: 409 - "Email ya registrado"
     *        - Error interno: 500 - "Internal error"
     */
    // Hacer el register
  };
}

export default new UsersController();
