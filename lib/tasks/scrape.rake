namespace :scrape do
  desc "TODO"
  task repair: :environment do
    require 'open-uri'
    require 'nokogiri'
    require 'yaml'

    url = 'https://mdb-idf.org/velocistes-parisiens-et-franciliens/#75'

    html_doc = Nokogiri::HTML(open(url).read)

    results = []

    html_doc.search('.spip').each do |arrondissement|
      nb_arr = arrondissement.search('caption').text.strip
      if nb_arr.match(/Paris\s\d{1,}e/)
        arrondissement.search('tr').each do |element|
          name = element.search('td')[0]
          name = name.text.strip if name
          address = element.search('td')[2]
          address = address.text.match(/(.*)((\d{2}\s){4})/) if address
          # p address[1] if address
          results << {name: name, address: address[1] + " " + nb_arr} unless address.nil? || address == ""
        end
      end
    end

    Dir.mkdir('db/scrape') unless File.exist?('db/scrape')
    File.open('db/scrape/reparateurs.yaml', "wb") { |out| out.puts results.to_yaml }
  end

end
