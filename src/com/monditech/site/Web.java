package com.monditech.site;

import javax.ejb.LocalBean;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.monditech.moon.Retorno;
import com.monditech.moon.SQL;

@LocalBean
@Path("/")
public class Web {
	
	@Produces(MediaType.APPLICATION_JSON)
	@GET
    @Path("/GetTeste")
	public Response GetTeste() {
		
		System.out.println("GetTeste-111");
		return Retorno.Sucesso("OKAY!");
		
	}
		
	@GET
    @Path("/Newsletter")
	public Response Newsletter(@QueryParam("assunto") String assunto, @QueryParam("email") String email) {
		
		try {
			
			SQL sql = new SQL();
			
			try {
				
				try {

					InternetAddress enderecoEmail = new InternetAddress(email);
					enderecoEmail.validate();
					
				}
				catch (AddressException ex) {

					throw new Exception("O e-mail informado é invalido!");
					
				}

				sql.PrepararQuery(	"insert into site_newsletter (empresa, site, assunto, email, data_inscricao) " + 
									"values(1, 'www.monditech.com.br', ?, ?, NOW())");

				sql.SetParametro(1, assunto);
				sql.SetParametro(2, email);
				sql.InsertUpdate();

				sql.Commit();
				
				return Retorno.Sucesso("OKAY!");
				
			}
			finally {
				
				sql.Close();
				
			}

		}
		catch (Exception ex) {

			return Retorno.Erro(ex);
			
		}
		
	}
	
	@GET
    @Path("/Contato")
	public Response Contato(@QueryParam("nome") String nome, @QueryParam("nome_empresa") String nome_empresa, @QueryParam("email") String email, @QueryParam("telefone") String telefone, @QueryParam("interesse") String interesse, @QueryParam("assunto") String assunto) {
		
		try {
			
			SQL sql = new SQL();
			
			try {
				
				try {

					InternetAddress enderecoEmail = new InternetAddress(email);
					enderecoEmail.validate();
					
				}
				catch (AddressException ex) {

					throw new Exception("O e-mail informado é invalido!");
					
				}
				
				if (nome.equals("")) {
					
					throw new Exception("Insira seu nome por gentileza.");
					
				}
				else if (telefone.equals("")) {
					
					throw new Exception("Insira seu telefone por gentileza.");
					
				}
				else if (interesse.equals("0")) {
					
					throw new Exception("Escolha um interese por gentileza.");
					
				}
				else if (assunto.equals("")) {
					
					throw new Exception("Escreva um assunto por gentileza.");
					
				}

				sql.PrepararQuery(	"insert into site_contatos (empresa, site, nome, nome_empresa, email, telefone, interesse, assunto, data) " + 
									"values(1, 'www.monditech.com.br', ?, ?, ?, ?, ?, ?, NOW())");

				sql.SetParametro(1, nome);
				sql.SetParametro(2, nome_empresa);
				sql.SetParametro(3, email);
				sql.SetParametro(4, telefone);
				sql.SetParametro(5, interesse);
				sql.SetParametro(6, assunto);
				sql.InsertUpdate();

				sql.Commit();
				
				return Retorno.Sucesso("OKAY!");
				
			}
			finally {
				
				sql.Close();
				
			}

		}
		catch (Exception ex) {

			return Retorno.Erro(ex);
			
		}
		
	}
	
}
