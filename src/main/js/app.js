const React = require('react');
const ReactDOM = require('react-dom');

const client = require('./client');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {instrumentos: [], musico:[]};
	}
	componentDidMount() {
		client({method: 'GET', path: '/api/instrumentos'}).done(response => {
			this.setState({instrumentos: response.entity._embedded.instrumentos});
		});
		client({method: 'GET', path: '/api/musico'}).done(response => {
			this.setState({musico: response.entity._embedded.musico});
		});
	}
	render() {
		return (
			<>
				<h2>Lista de Instrumentos</h2>
				<InstrumentoList instrumentos={this.state.instrumentos}/>
				<hr />
				<h2>Lista de Cantantes</h2>
				<MusicoList musico={this.state.musico}/>
			</>
		)
	}
}

class InstrumentoList extends React.Component{
	render() {
		const instrumentos = this.props.instrumentos.map(instrumento =>
			<Instrumento key={instrumento._links.self.href} instrumento={instrumento}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Categoria</th>
						<th>Descripción</th>
					</tr>
					{instrumentos}
				</tbody>
			</table>
		)
	}
}
class MusicoList extends React.Component{
	render() {
		const musico = this.props.musico.map(musico =>
			<Musico key={musico._links.self.href} musico={musico}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Nombre</th>
					</tr>
					{musico}
				</tbody>
			</table>
		)
	}
}

class Instrumento extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.instrumento.nombre}</td>
				<td>{this.props.instrumento.categoria}</td>
				<td>{this.props.instrumento.descripcion}</td>
			</tr>
		)
	}
}
class Musico extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.musico.nombre}</td>
			</tr>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('react'))
