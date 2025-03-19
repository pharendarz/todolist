

Plik z zadaniem zawiera projekt Angular z dodanymi 
bibliotekami Tailwind i FontAwesome (przy użyciu paczki
 FortAwesome)
Jest to szablon dla aplikacji ToDoList. Wykonaj w miarę
 możliwości jak największą ilość poniższych punktów.
Tam gdzie nie jest wyszczególniony dokładny sposób 
realizacji wykorzystaj najlepsze znane metody, 
aby aplikacja była prosta i optymalna wydajnościowo.
Możesz użyć dodanych bibliotek oraz własnych i
 wykorzystać je do logiki oraz wyglądu aplikacji.

1. Zrób, aby menu w wersji mobilnej ukrywało się i
 wyświetlało po naciśnięciu przycisku "hamburger".


2. Dodaj komponenty list i add, dodaj je do routera 
aplikacji z możliwością ich przełączania z menu.



3. Dodaj do aplikacji magazyn danych na listę "todo" 
która będzie zawierać listę zadań składających się z
 pól date, location, content, display.
4. Dodaj predefiniowaną listę przykładowych zadań
5. W komponencie list dodaj wyświetlanie listy zadań 
których parametr display ma wartość true.
6. Dodaj na górze listy filtr tekstowy który będzie 
stawiać display na false dla zadań w których pola date,
 location i content nie zawierają wpisanej wartości.
7. Dodaj w komponencie add formularz który będzie 
dodawał kolejne zadanie do listy zadań.
8. Dodaj przy ikonie dzwonka w menu sumaryczną liczbę 
zadań na dziś i przyszłość 
9. Przy wyświetlaniu komponentu list dodaj funkcjonalność 
która będzie dla PIERWSZEGO wyświetlanego zadania odpytywać api 
pod adresem
	https://geocoding-api.open-meteo.com/v1/search?name=LOCATION&count=10&language=pl&format=json
	Z location w parametrze name i dodawać do obiektu
	 zadania pobrane latitude i longitude z pierwszego 
	 wyniku zapytania lub wyświetlać informację o
	  nieudanym odnalezieniu lokalizacji.
10. Dla powyższego zadania dodaj wykonywanie dodatkowo zapytania 
do api pod adresem
	https://api.open-meteo.com/v1/forecast?latitude=LATITUDE&longitude=LONGITUDE&current=temperature_2m
	Wstawiając odpowiednio parametry latitude i longitude. Zwrócony parametr temperature_2m zapisz do obiektu zadania i wyświetl na liście zadań.
	
