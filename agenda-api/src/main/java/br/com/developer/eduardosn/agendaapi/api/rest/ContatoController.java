package br.com.developer.eduardosn.agendaapi.api.rest;

import br.com.developer.eduardosn.agendaapi.mode.entity.Contato;
import br.com.developer.eduardosn.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/contatos")
@RequiredArgsConstructor
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
    public void favorite( @PathVariable Integer id, @RequestBody Boolean favorito ) {
        Optional<Contato> contato = contatoRepository.findById(id);
        contato.ifPresent( c -> {
            c.setFavorito(favorito);
            contatoRepository.save(c);
        });
    }
}
