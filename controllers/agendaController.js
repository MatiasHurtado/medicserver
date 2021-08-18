const Agenda = require("../models/Agenda");

exports.CrearAgenda = async (req, res) => {
  try {
    const agenda = new Agenda(req.body);
    agenda.save();
    res.json(agenda);
    console.log("Agenda Creada Con Exito");
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.ObtenerAgendas = async (req, res) => {
  try {
    const valor = req.params;

    const agendas = await Agenda.find({
      estado: valor.estado,
      medico: valor.medico,
    })
      .populate("medico")
      .populate("cliente");
    // const agendas = await Agenda.findById({_id:valor._id}).populate('medico')
    res.json({ agendas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerAgendaCliente = async (req, res) => {
  try {
    const valor = req.params;
    const agenda = await Agenda.find({ cliente: valor.cliente })
      .populate("medico")
      .populate("cliente");
    res.json({ agenda });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.AsignarAgenda = async (req, res) => {
  try {
    //Revisamos la agenda
    // let agenda= await Agenda.findById(req.params.id)

    // console.log(agenda)
    //Verificamos si la agenda existe

    //Actualizamos la agenda
    const { estado, cliente } = req.body;

    const nuevaAgenda = {};

    nuevaAgenda.estado = estado;
    nuevaAgenda.cliente = cliente;

    console.log(`EL CLIENTE ES ${cliente} AA ${estado}`);
    let agenda = await Agenda.findOneAndUpdate(
      { _id: req.params.id },
      nuevaAgenda,
      { new: true }
    );
    // console.log(agenda)
    res.json({ agenda });
  } catch (error) {
    console.log(error);
  }
};
exports.RechazarHora = async (req, res) => {
  try {
    //Actualizamos la agenda
    const { estado, cliente } = req.body;

    const nuevaAgenda = {};

    nuevaAgenda.estado = estado;


    let agenda = await Agenda.findOneAndUpdate(
        { _id: req.params.id },
  
        {
          $set: {
            estado : false,
          },
          $unset: {
            cliente,
          },
        },
      
      );


    console.log("aaa",agenda);

    res.json({ agenda });
  } catch (error) {
    console.log(error);
  }
};

exports.EliminarAgenda = async (req, res) => {
  try {
    console.log(req.params.id);
    //Revisamos si la agenda existe
    let agenda = await Agenda.findById(req.params.id);

    //Si La agenda existe
    if (!agenda) {
      return res.status(404).json({ msg: "Agenda no encontrada" });
    }

    //Eliminamos La agenda
    await Agenda.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Agenda Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
