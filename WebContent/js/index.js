var newsletterBloqueado = false;
var contatoBloqueado = false;

$(document).ready(function ($) {

    $(".scroll").click(function (event) {

        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 800);

    });

    $("#bt-produtos").mouseover(function () {

        $("#menu-produtos").fadeIn();

    });

    $("#menu-produtos").mouseleave(function () {

        $("#menu-produtos").fadeOut();

    });

    $("#footer").text($("#footer").text().replace("#ANO_ATUAL#", new Date().getFullYear()));

    $("#conteudo").load("home.html", function () {

        ConfiguraHome();

        $("#master").fadeIn(function () {

            $(".menu").on("click", function () {

                var pagina = $(this).attr("id");

                $("#conteudo").load(pagina + ".html", function () {

                    ConfiguraPagina(pagina);
                    ConfiguraCliqueConteudo();
                    ScrollTop();

                });

            });

        });

    });

});

function ConfiguraPagina(id) {

    if (id == "home") {

        ConfiguraHome();

    }
    else if (id == "sobre_nos") {

        ConfiguraSobreNos();

    }
    else if (id == "servicos_fabrica_software") {

        ConfiguraCarousel();

    }
    else if (id == "contato") {

        ConfiguraContato();

    }

}

function ConfiguraHome() {

    $("#quadro-1").hover(function () {

        $("#imagem-quadro-1").css("background", "url('img/animacoes/animacao-01.gif') no-repeat");

    },
    function () {

        $("#imagem-quadro-1").css("background", "url('img/animacoes/imagem-01.png') no-repeat");

    });

    $("#quadro-2").hover(function () {

        $("#imagem-quadro-2").css("background", "url('img/animacoes/animacao-02.gif') no-repeat");

    },
    function () {

        $("#imagem-quadro-2").css("background", "url('img/animacoes/imagem-02.png') no-repeat");

    });

    $("#quadro-3").hover(function () {

        $("#imagem-quadro-3").css("background", "url('img/animacoes/animacao-03.gif') no-repeat");

    },
    function () {

        $("#imagem-quadro-3").css("background", "url('img/animacoes/imagem-03.png') no-repeat");

    });

}

function ConfiguraSobreNos() {

    $(".time-monditech").on("click", function () {

        window.open("https://www.linkedin.com/in/" + $(this).attr("perfil"));

    });

}

function ConfiguraContato() {
    
    $("#contatoBotaoSolicitar").on("click", function () {

        SalvarContato(this);

    });

}

function ConfiguraCarousel() {

    $(".carousel").carousel("cycle");

}

function ConfiguraCliqueConteudo() {

    $("#conteudo .menu").on("click", function () {

        $("#conteudo").load($(this).attr("id") + ".html", function () {

            ConfiguraCliqueConteudo();
            ScrollTop();

        });

    });

}

function ScrollTop() {

    $("html, body").animate({
        scrollTop: ($("#master").offset().top)
    }, 0);

}

function SalvarNewsletter(assunto, botao) {

    if (!newsletterBloqueado) {

        newsletterBloqueado = true;

        var textoAntigo = $(botao).html();
        var loading = "<div class='spinner-border text-light' role='status' style='width:20px; height:20px'>" +
            "<span class='sr-only'>Loading...</span>" +
            "</div>";

        $(botao).html(loading);

        var email = assunto == "geral" ? $("#emailContatoFooter").val() : $("#emailContatoConteudo").val();

        $.ajax({

            type: "GET",
            contentType: "application/json",
            url: window.location.href + "api/rest/Newsletter?assunto=" + assunto + "&email=" + email,
            async: true,
            data: {},
            success: function (res, status, xhr) {

                newsletterBloqueado = false;
                ShowAlert("Obrigado!", "Seu e-mail foi cadastrado com sucesso!", "success");
                $(botao).html(textoAntigo);

            },
            error: function (res, textStatus, errorThrown) {

                newsletterBloqueado = false;
                
                if (res.responseText == "O e-mail informado é invalido!") {

                    ShowAlert("Ops, algo deu errado:", res.responseText, "danger");

                }
                else {

                    ShowAlert("Ops, não foi possível cadastrar seu e-mail", "Poderia nos enviar um e-mail para contato@monditech.com.br?", "danger");

                }

                $(botao).html(textoAntigo);

            }

        });

    }

}

function SalvarContato(botao) {

    if (!contatoBloqueado) {

        contatoBloqueado = true;

        var textoAntigo = $(botao).html();
        var loading = "<div class='spinner-border text-light' role='status' style='width:20px; height:20px'>" +
            "<span class='sr-only'>Loading...</span>" +
            "</div>";

        $(botao).html(loading);

        var nome = $("#contatoNome").val();
        var nome_empresa = $("#contatoEmpresa").val();
        var email = $("#contatoEmail").val();
        var telefone = $("#contatoFone").val();
        var interesse = $("#contatoInteresse").val();
        var assunto = $("#contatoAssunto").val();

        if (email == "") {

            contatoBloqueado = false;
            $(botao).html(textoAntigo);

            ShowAlert("Ops, algo deu errado:", "Insira seu e-mail por gentileza.", "danger");

        }
        else if (nome == "") {

            contatoBloqueado = false;
            $(botao).html(textoAntigo);

            ShowAlert("Ops, algo deu errado:", "Insira seu nome por gentileza.", "danger");

        }
        else if (interesse == "0") {

            contatoBloqueado = false;
            $(botao).html(textoAntigo);

            ShowAlert("Ops, algo deu errado:", "Escolha um interesse por gentileza.", "danger");

        }
        else if (interesse == "0") {

            contatoBloqueado = false;
            $(botao).html(textoAntigo);

            ShowAlert("Ops, algo deu errado:", "Escreva um assunto por gentileza.", "danger");

        }
        else {

            $.ajax({

                type: "GET",
                contentType: "application/json",
                url: window.location.href + "api/rest/Contato?nome=" + nome + "&nome_empresa=" + nome_empresa + "&email=" + email + "&telefone=" + telefone + "&interesse=" + interesse + "&assunto=" + assunto,
                async: true,
                data: {},
                success: function (res, status, xhr) {

                    contatoBloqueado = false;
                    $(botao).html(textoAntigo);

                    ShowAlert("Obrigado!", "Em breve entraremos em contato!", "success");

                },
                error: function (res, textStatus, errorThrown) {

                    contatoBloqueado = false;
                    $(botao).html(textoAntigo);

                    ShowAlert("Ops, algo deu errado:", res.responseText, "danger");

                }

            });

        }

    }

}

function ShowAlert(titulo, conteudo, tipo) {

    var alerta =    "<div class='alert alert-" + tipo + " alert-dismissible message-alert' role='alert'>" +
                    "<strong>" + titulo + "</strong> " + conteudo +
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
                    "<span aria-hidden='true'>&times;</span>" +
                    "</button>" +
                    "</div>";

    $("#alertas").html(alerta);

}