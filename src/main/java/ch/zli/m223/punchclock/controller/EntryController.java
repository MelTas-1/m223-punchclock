package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.Entry;
import ch.zli.m223.punchclock.service.EntryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/entries")
public class EntryController {
    private EntryService entryService;

    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }


    // Hier werden alle Entries ausgegeben
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Entry> getAllEntries() {
        return entryService.findAll();
    }


    // Hier wird via einem Post request ein Entry kreiert
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Entry createEntry(@Valid @RequestBody Entry entry) {
        return entryService.createEntry(entry);
    }

    //Änderung eines  Eintrags
    //zurückgeben eines Eintrags
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Entry updateEntry(@Valid @RequestBody Entry entry){return entryService.updateEntry(entry);}

    // löschen eines Eintrags

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEntry(@PathVariable Long id) {entryService.deleteEntry(id);}
}
