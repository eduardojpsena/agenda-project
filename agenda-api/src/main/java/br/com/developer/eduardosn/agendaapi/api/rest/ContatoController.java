package br.com.developer.eduardosn.agendaapi.api.rest;

import br.com.developer.eduardosn.agendaapi.mode.entity.Contato;
import br.com.developer.eduardosn.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/contatos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContatoController {

    private final ContatoRepository contatoRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save( @RequestBody Contato contato ) {
        return contatoRepository.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete( @PathVariable Integer id ) {
        contatoRepository.deleteById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Contato> list() {
        return contatoRepository.findAll();
    }

    @PatchMapping("{id}/favorito")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void favorite( @PathVariable Integer id ) {
        Optional<Contato> contato = contatoRepository.findById(id);
        contato.ifPresent( c -> {
            boolean favorito = c.getFavorito() == Boolean.TRUE;
            c.setFavorito(!favorito);
            contatoRepository.save(c);
        });
    }

    @PutMapping("{id}/foto")
    public byte[] addPhoto( @PathVariable Integer id,
                            @RequestParam("foto") Part arquivo) {
        Optional<Contato> contato = contatoRepository.findById(id);
        return contato.map( c -> {
            try {
                InputStream is = arquivo.getInputStream();
                byte[] bytes = new byte[(int) arquivo.getSize()];
                IOUtils.readFully(is, bytes);
                contatoRepository.save(c);
                is.close();
                return bytes;
            } catch (IOException e) {
                return  null;
            }
        }).orElse(null);
    }

}
