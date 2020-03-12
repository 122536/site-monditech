package com.monditech.site;

import javax.ejb.LocalBean;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@LocalBean
@Path("/")
public class Web {
	
	@Produces(MediaType.APPLICATION_JSON)
	@GET
    @Path("/GetTeste")
	public String GetTeste() {
		
		System.out.println("GetTeste-111");
		return "OKAY!";
		
	}
		
	@GET
    @Path("/Newsletter")
	public void Newsletter(@QueryParam("assunto") String assunto, @QueryParam("email") String email) {
		
		
		
	}
	
	@GET
    @Path("/Contato")
	public void Contato(@QueryParam("nome") String nome, @QueryParam("nome_empresa") String nome_empresa, @QueryParam("email") String email, @QueryParam("telefone") String telefone, @QueryParam("interesse") String interesse, @QueryParam("assunto") String assunto) {
		
		
		
	}
	
}
