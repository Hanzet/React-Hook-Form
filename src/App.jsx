import { useForm } from "react-hook-form"

function App() {

  const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);

  alert("Enviado")
  reset()
  })

  return (
    <form onSubmit={onSubmit}>

      {/* Nombre */}
      <label
      htmlFor="nombre">Nombre
      </label>
      <input type="text" {...register("nombre", {
        required:{
          value: true,
          message: "Nombre requerido"
        },
        pattern:{
          value: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
          message: "Caracteres no validos"
        },
        minLength: {
          value: 2,
          message: "Nombre debe tener minimo 2 caracteres"
        },
        maxLength: {
          value: 20,
          message: "Nombre debe tener maximo 20 caracteres"
        }
        })}>
      </input>
      {
        errors?.nombre && <p>{errors?.nombre?.message}</p>
      }
      {/* {
        errors?.nombre?.type === "required" && <p>Nombre requerido</p>
      }
      {
        errors?.nombre?.type === "pattern" && <p>Caracteres no validos</p>
      }
      {
        errors?.nombre?.type === "minLength" && <p>Nombre debe tener minimo 2 caracteres</p>
      } */}

      {/* Correo */}
      <label
      htmlFor="correo">Correo
      </label>
      <input type="email" {...register("correo", {
        required: {
          value: true,
          message: "Correo requerido"
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Correo no valido"
        },
        })}>
      </input>
      {
        errors?.correo && <p>{errors?.correo?.message}</p>
      }
      {/* {
        errors?.correo?.type === "required" && <p>Correo requerido</p>
      }
      {
        errors?.correo?.type === "pattern" && <p>Correo no valido</p>
      } */}

      {/* Contraseña */}
      <label
      htmlFor="password">Contraseña
      </label>
      <input type="password" {...register("password", {
        required: true,
        })}>
      </input>
      {
        errors?.password && <p>Contraseña requerida</p>
      }

      {/* ConfirmarContraseña */}
      <label
      htmlFor="confirmarPassword">Confirmar Contraseña
      </label>
      <input type="password" {...register("confirmarPassword", {
        required: {
          value: true,
          message: "Confirmar contraseña",
        },
        // validate: (value) => {
        //   if (value === watch("password")) {
        //     return true
        //   } else {
        //     return "Las contraseñas no coinciden"
        //   }
        // },
        validate: value => value === watch("password") || "Las contraseñas no coinciden",
        })}>
      </input>
      {
        errors?.confirmarPassword && <p>{errors?.confirmarPassword?.message}</p>
      }

      {/* Fecha */}
      <label
      htmlFor="fecha">Fecha
      </label>
      <input type="date" {...register("fechaNacimiento", {
        required:{
          value: true,
          message: "Fecha requerida"
        },
        validate: (value) => {
          const fechaNacimiento = new Date(value);
          const fechaActual = new Date();
          const edad =
            fechaActual.getFullYear() - fechaNacimiento.getFullYear();
          // if (edad >= 18) {
          //   return true
          // } else {
          //   return "Debe ser mayor de 18 años"
          // }
          return edad >= 18 || "Debe ser mayor de 18 años"
        }
      },
      )}>
      </input>
      {
        errors?.fechaNacimiento && <p>{errors?.fechaNacimiento?.message}</p>
      }

      {/* Pais */}
      <label
      htmlFor="pais">Pais
      <select {...register("pais")}>
        <option value="mx">México</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {
        watch("pais") == "ar" && (
          <>
            <input type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia requerida",
              },
            })}>
            </input>
            {
              errors?.provincia && <p>{errors?.provincia?.message}</p>
            }
          </>
        )
      }
      </label>

      {/* Archivo */}
      <label
      htmlFor="foto">Foto de perfil
      </label>
      <input type="file" onChange={(e) => setValue("foto", e.target.files[0])}
      {...register("foto")}>
      </input>

      {/* Terminos */}
      <label
      htmlFor="terminos">Acepto terminos y condiciones
      </label>
      <input type="checkbox" {...register("terminos", {
        required: {
          value: true,
          message: "Debe aceptar los terminos y condiciones",
        }
        })}>
      </input>
      {
        errors?.terminos && <p>{errors?.terminos?.message}</p>
      }

      <button type="submit">Enviar</button>
      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}

export default App
